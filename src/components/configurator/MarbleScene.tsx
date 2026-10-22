import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { buildMarbleModel, disposeMarbleModel } from "./marbleSceneModel";
import { createMarbleTexture, marbleImages } from "./marbleTextures";
import { PREVIEW_CONTRAST } from "./marbleConfiguration";
import type { CameraView, MarbleConfiguration } from "./marbleConfiguration";

export type PreviewStatus = "loading" | "ready" | "texture-error" | "unavailable";
export interface MarbleSceneHandle {
  setView: (view: CameraView) => void;
  reset: () => void;
  zoom: (factor: number) => void;
}

interface Props {
  configuration: MarbleConfiguration;
  contrastPercent?: number;
  label: string;
  onStatus: (status: PreviewStatus) => void;
}

function createScene(host: HTMLDivElement, onStatus: Props["onStatus"]) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  let shaderFailed = false;
  renderer.debug.onShaderError = (gl, program, vertexShader, fragmentShader) => {
    shaderFailed = true;
    console.error("[Marble Studio] A WebGL shader could not compile.",
      gl.getProgramInfoLog(program), gl.getShaderInfoLog(vertexShader), gl.getShaderInfoLog(fragmentShader));
  };
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 200);
  camera.position.set(3, 2, 7);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  // Render on input changes rather than running an idle animation loop.
  controls.enableDamping = false;
  controls.minPolarAngle = 0.01;
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.rotateSpeed = 0.65;
  controls.zoomSpeed = 0.8;
  const hemisphere = new THREE.HemisphereLight("#ffffff", "#b6a790", 1.1);
  const sunlight = new THREE.DirectionalLight("#fff7e9", 2);
  sunlight.position.set(5, 9, 6);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(1024, 1024);
  sunlight.shadow.normalBias = 0.025;
  scene.add(hemisphere, sunlight, sunlight.target);

  const environmentRoom = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  let environment: THREE.WebGLRenderTarget | null = null;
  try {
    environment = pmrem.fromScene(environmentRoom, 0.04);
    if (shaderFailed) {
      environment.dispose();
      environment = null;
    }
  } catch (error) {
    // Reflections are optional: the direct lights can still illuminate the model.
    console.warn("[Marble Studio] Using direct lighting without environment reflections.", error);
  } finally {
    environmentRoom.dispose();
    pmrem.dispose();
    renderer.setRenderTarget(null);
    shaderFailed = false;
  }
  scene.environment = environment?.texture ?? null;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute("role", "img");
  host.appendChild(renderer.domElement);

  let disposed = false;
  let lostContext = false;
  let model: THREE.Group | null = null;
  let activeConfiguration: MarbleConfiguration | null = null;
  let currentView: CameraView = "perspective";
  let geometryKey = "";
  let renderedKey = "";
  let requestId = 0;
  let modelRequestId = 0;
  let frame = 0;
  let viewportWidth = 0;
  let viewportHeight = 0;
  let waitingForSize = 0;
  const textureLoader = new THREE.TextureLoader();
  const textureRequests = new Map<string, Promise<THREE.Texture>>();
  const loadedTextures = new Set<THREE.Texture>();
  const marbleContrast = new THREE.Uniform(PREVIEW_CONTRAST.default / 100);

  function draw() {
    if (disposed || lostContext || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (disposed || lostContext) return;
      if (!model) return;
      if (!syncViewport()) {
        // A hidden or not-yet-laid-out canvas must not become a 1px "ready" preview.
        if (++waitingForSize < 120) draw();
        else onStatus("unavailable");
        return;
      }
      waitingForSize = 0;
      try {
        renderer.render(scene, camera);
        if (shaderFailed) onStatus("unavailable");
        else if (modelRequestId === requestId) onStatus("ready");
      } catch (error) {
        console.error("[Marble Studio] The 3D frame could not be drawn.", error);
        onStatus("unavailable");
      }
    });
  }

  function fit() {
    if (!model || !activeConfiguration) return;
    const bounds = new THREE.Box3().setFromObject(model);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const radius = size.length() / 2;
    const verticalFov = THREE.MathUtils.degToRad(camera.fov);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
    const distance = radius / Math.sin(Math.min(verticalFov, horizontalFov) / 2) * 1.1;
    const direction = currentView === "surface"
      ? new THREE.Vector3(0, activeConfiguration.application === "wall" ? 0.02 : 1, activeConfiguration.application === "wall" ? 1 : 0.001)
      : new THREE.Vector3(1.05, 0.9, 1.3);
    controls.minAzimuthAngle = ["floor", "wall"].includes(activeConfiguration.application) ? -Math.PI * 0.35 : -Infinity;
    controls.maxAzimuthAngle = ["floor", "wall"].includes(activeConfiguration.application) ? Math.PI * 0.48 : Infinity;
    controls.minDistance = Math.max(0.3, radius * 0.45);
    controls.maxDistance = distance * 2.5;
    controls.target.copy(center);
    camera.position.copy(center).add(direction.normalize().multiplyScalar(distance));
    camera.far = Math.max(100, distance * 6);
    camera.updateProjectionMatrix();
    controls.update();
    const extent = Math.max(size.x, size.y, size.z) * 0.9;
    Object.assign(sunlight.shadow.camera, { left: -extent, right: extent, top: extent, bottom: -extent, far: 60 });
    sunlight.shadow.camera.updateProjectionMatrix();
    sunlight.position.copy(center).add(new THREE.Vector3(extent, 9 + size.y, extent));
    sunlight.target.position.copy(center);
    draw();
  }

  function syncViewport() {
    const bounds = host.getBoundingClientRect();
    const width = Math.floor(bounds.width);
    const height = Math.floor(bounds.height);
    if (width < 2 || height < 2) return false;
    if (width !== viewportWidth || height !== viewportHeight) {
      viewportWidth = width;
      viewportHeight = height;
      // Set explicit CSS pixel dimensions as well as the GPU drawing-buffer size.
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      fit();
    }
    return true;
  }

  function resize() {
    if (disposed || lostContext) return;
    syncViewport();
    draw();
  }

  function resume() { if (!document.hidden) resize(); }

  function zoom(factor: number) {
    const offset = camera.position.clone().sub(controls.target);
    offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance));
    camera.position.copy(controls.target).add(offset);
    controls.update();
    draw();
  }

  function keydown(event: KeyboardEvent) {
    if (["+", "=", "-", "_"].includes(event.key)) {
      event.preventDefault();
      zoom(event.key === "+" || event.key === "=" ? 0.85 : 1.18);
    } else if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      if (event.key === "ArrowLeft") spherical.theta -= 0.12;
      if (event.key === "ArrowRight") spherical.theta += 0.12;
      if (event.key === "ArrowUp") spherical.phi -= 0.1;
      if (event.key === "ArrowDown") spherical.phi += 0.1;
      spherical.makeSafe();
      camera.position.copy(controls.target).add(offset.setFromSpherical(spherical));
      controls.update();
      draw();
    }
  }

  function contextLost(event: Event) {
    event.preventDefault();
    lostContext = true;
    onStatus("unavailable");
  }
  function contextRestored() {
    lostContext = false;
    shaderFailed = false;
    onStatus("loading");
    resize();
  }
  controls.addEventListener("change", draw);
  renderer.domElement.addEventListener("keydown", keydown);
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  renderer.domElement.addEventListener("webglcontextrestored", contextRestored);
  const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
  observer?.observe(host);
  window.addEventListener("resize", resize);
  window.addEventListener("pageshow", resize);
  document.addEventListener("visibilitychange", resume);
  resize();

  return {
    setLabel(label: string) { renderer.domElement.setAttribute("aria-label", label); },
    setContrast(percent: number) {
      const value = Number.isFinite(percent) ? percent : PREVIEW_CONTRAST.default;
      marbleContrast.value = THREE.MathUtils.clamp(value, PREVIEW_CONTRAST.minimum, PREVIEW_CONTRAST.maximum) / 100;
      draw();
    },
    async update(configuration: MarbleConfiguration) {
      const imageUrl = marbleImages[configuration.productSlug];
      const nextRenderedKey = imageUrl + JSON.stringify({ ...configuration, wastePercent: 0 });
      if (model && renderedKey === nextRenderedKey) {
        // Returning to the visible stone must invalidate any other pending load.
        modelRequestId = ++requestId;
        draw();
        return;
      }
      const id = ++requestId;
      onStatus("loading");
      try {
        if (!textureRequests.has(imageUrl)) {
          const promise = textureLoader.loadAsync(imageUrl).then((texture) => {
            texture.name = configuration.productSlug;
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
            if (disposed) texture.dispose();
            else loadedTextures.add(texture);
            return texture;
          }).catch((error: unknown) => {
            // A temporary image failure must not poison the cache for later selections.
            textureRequests.delete(imageUrl);
            throw error;
          });
          textureRequests.set(imageUrl, promise);
        }
        const sourceTexture = await textureRequests.get(imageUrl)!;
        if (disposed || id !== requestId || lostContext) return;
        const nextModel = buildMarbleModel(configuration, (width, height) => createMarbleTexture(sourceTexture, width, height, configuration.veinDirection), marbleContrast);
        if (model) {
          scene.remove(model);
          disposeMarbleModel(model);
        }
        model = nextModel;
        modelRequestId = id;
        renderedKey = nextRenderedKey;
        activeConfiguration = configuration;
        scene.add(model);
        const nextKey = [configuration.application, configuration.lengthCm, configuration.widthCm, configuration.thicknessCm, configuration.steps, configuration.riseCm].join("/");
        if (geometryKey !== nextKey) { geometryKey = nextKey; fit(); }
        draw();
      } catch (error) {
        console.error("[Marble Studio] The selected marble could not be prepared.", error);
        if (!disposed && id === requestId) onStatus("texture-error");
      }
    },
    setView(view: CameraView) { currentView = view; fit(); },
    reset() { currentView = "perspective"; fit(); },
    zoom,
    dispose() {
      disposed = true;
      requestId++;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pageshow", resize);
      document.removeEventListener("visibilitychange", resume);
      renderer.domElement.removeEventListener("keydown", keydown);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", contextRestored);
      controls.removeEventListener("change", draw);
      controls.dispose();
      if (model) disposeMarbleModel(model);
      for (const texture of loadedTextures) texture.dispose();
      loadedTextures.clear();
      textureRequests.clear();
      environment?.dispose();
      sunlight.shadow.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}

const MarbleScene = forwardRef<MarbleSceneHandle, Props>(function MarbleScene({ configuration, contrastPercent = PREVIEW_CONTRAST.default, label, onStatus }, ref) {
  const host = useRef<HTMLDivElement>(null);
  const engine = useRef<ReturnType<typeof createScene> | null>(null);
  useImperativeHandle(ref, () => ({
    setView: (view) => engine.current?.setView(view),
    reset: () => engine.current?.reset(),
    zoom: (factor) => engine.current?.zoom(factor),
  }), []);

  useEffect(() => {
    if (!host.current) return;
    try { engine.current = createScene(host.current, onStatus); }
    catch (error) {
      console.error("[Marble Studio] The 3D viewer could not start.", error);
      onStatus("unavailable");
    }
    return () => { engine.current?.dispose(); engine.current = null; };
  }, [onStatus]);

  useEffect(() => { void engine.current?.update(configuration); }, [configuration, onStatus]);
  useEffect(() => { engine.current?.setContrast(contrastPercent); }, [contrastPercent, onStatus]);
  useEffect(() => { engine.current?.setLabel(label); }, [label]);
  return <div className="mc-canvas" style={{ position: "absolute", inset: 0, width: "auto", height: "auto" }} ref={host} />;
});

export default MarbleScene;
