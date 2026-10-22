import * as THREE from "three";
import { tileDimensions } from "./marbleConfiguration";
import type { MarbleConfiguration } from "./marbleConfiguration";

export type SurfaceTextureFactory = (widthCm: number, heightCm: number) => THREE.Texture;

// Geometry is expressed in metres; every customer dimension changes the model itself.
export function buildMarbleModel(configuration: MarbleConfiguration, texture: SurfaceTextureFactory, contrast: THREE.IUniform<number> = { value: 1 }) {
  const group = new THREE.Group();
  const width = configuration.lengthCm / 100;
  const depth = configuration.widthCm / 100;
  const thickness = configuration.thicknessCm / 100;
  const plaster = new THREE.MeshStandardMaterial({ color: "#e6e0d6", roughness: 0.94 });
  const concrete = new THREE.MeshStandardMaterial({ color: "#c1b8aa", roughness: 0.95 });
  const wood = new THREE.MeshStandardMaterial({ color: "#9a7150", roughness: 0.72 });
  const dark = new THREE.MeshStandardMaterial({ color: "#373b36", roughness: 0.8 });
  const fabric = new THREE.MeshStandardMaterial({ color: "#c8beaa", roughness: 1 });
  const brass = new THREE.MeshStandardMaterial({ color: "#ac8a59", metalness: 0.65, roughness: 0.3 });
  const stoneMaterials = new Map<string, THREE.MeshPhysicalMaterial>();

  function box(name: string, size: [number, number, number], position: [number, number, number], material: THREE.Material | THREE.Material[]) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.name = name;
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  function cylinder(radius: number, height: number, position: [number, number, number], material: THREE.Material) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 32), material);
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  function stoneSurface(widthCm: number, heightCm: number) {
    const key = `${widthCm}/${heightCm}`;
    const cached = stoneMaterials.get(key);
    if (cached) return cached;
    const material = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      map: texture(widthCm, heightCm),
      roughness: configuration.finish === "polished" ? 0.18 : 0.78,
      metalness: 0,
      clearcoat: configuration.finish === "polished" ? 0.12 : 0,
      clearcoatRoughness: 0.16,
      envMapIntensity: 0.35,
    });
    material.onBeforeCompile = (shader) => {
      shader.uniforms.marbleContrast = contrast;
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", "#include <common>\nuniform float marbleContrast;")
        .replace("#include <map_fragment>", `#include <map_fragment>
          // Preserve the white stone background while increasing vein contrast.
          diffuseColor.rgb = clamp(vec3(1.0) + (diffuseColor.rgb - vec3(1.0)) * marbleContrast, 0.0, 1.0);
        `);
    };
    material.customProgramCacheKey = () => "marble-photo-contrast-v1";
    stoneMaterials.set(key, material);
    return material;
  }

  function slab(name: string, size: [number, number, number], position: [number, number, number], surface?: THREE.Material, face: "top" | "front" = "top") {
    const side = stoneSurface(size[2] * 100, size[1] * 100);
    const bottom = stoneSurface(size[0] * 100, size[2] * 100);
    const back = stoneSurface(size[0] * 100, size[1] * 100);
    const materials: THREE.Material[] = [side, side, face === "top" && surface ? surface : bottom, bottom, face === "front" && surface ? surface : back, back];
    return box(name, size, position, materials);
  }

  function tiledSlab(name: string, size: [number, number, number], position: [number, number, number], face: "top" | "front") {
    const grout = new THREE.MeshStandardMaterial({ color: "#aaa69e", roughness: 1 });
    const backing = slab(name, size, position, grout, face);
    const [tileWidth, tileHeight] = tileDimensions(configuration.tileSize);
    const surfaceWidth = configuration.lengthCm;
    const surfaceHeight = configuration.widthCm;
    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const joint = 0.2; // 2 mm joints, expressed in centimetres.

    // Each tile has its own UV rectangle, all sampling one directly loaded photo.
    // Build one mesh rather than one draw call per tile, including partial edge tiles.
    for (let row = 0; row < Math.ceil(surfaceHeight / tileHeight); row++) {
      const shift = configuration.layout === "staggered" && row % 2 ? tileWidth / 2 : 0;
      for (let column = 0; column < Math.ceil((surfaceWidth + shift) / tileWidth); column++) {
        const tileX = column * tileWidth - shift;
        const tileY = row * tileHeight;
        const x0 = Math.max(0, tileX + joint / 2);
        const x1 = Math.min(surfaceWidth, tileX + tileWidth - joint / 2);
        const y0 = tileY + joint / 2;
        const y1 = Math.min(surfaceHeight, tileY + tileHeight - joint / 2);
        if (x1 <= x0 || y1 <= y0) continue;
        const left = -size[0] / 2 + x0 / 100;
        const right = -size[0] / 2 + x1 / 100;
        const index = positions.length / 3;
        if (face === "top") {
          const near = size[2] / 2 - y0 / 100;
          const far = size[2] / 2 - y1 / 100;
          const top = size[1] / 2 + 0.0001;
          positions.push(left, top, near, right, top, near, right, top, far, left, top, far);
          for (let corner = 0; corner < 4; corner++) normals.push(0, 1, 0);
        } else {
          const bottom = -size[1] / 2 + y0 / 100;
          const top = -size[1] / 2 + y1 / 100;
          const front = size[2] / 2 + 0.0001;
          positions.push(left, bottom, front, right, bottom, front, right, top, front, left, top, front);
          for (let corner = 0; corner < 4; corner++) normals.push(0, 0, 1);
        }
        const u0 = (x0 - tileX) / tileWidth;
        const u1 = (x1 - tileX) / tileWidth;
        const v0 = (y0 - tileY) / tileHeight;
        const v1 = (y1 - tileY) / tileHeight;
        uvs.push(u0, v0, u1, v0, u1, v1, u0, v1);
        indices.push(index, index + 1, index + 2, index, index + 2, index + 3);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    const tiles = new THREE.Mesh(geometry, stoneSurface(tileWidth, tileHeight));
    tiles.name = `${name}-tiles`;
    tiles.receiveShadow = true;
    backing.add(tiles);
  }

  function bench(x: number, z: number, benchWidth: number) {
    box("bench-seat", [benchWidth, 0.12, 0.5], [x, 0.49, z], wood);
    for (const offset of [-1, 1]) {
      box("bench-leg", [0.07, 0.43, 0.38], [x + offset * (benchWidth / 2 - 0.12), 0.215, z], dark);
    }
  }

  function vase(x: number, y: number, z: number) {
    cylinder(0.095, 0.23, [x, y + 0.115, z], dark);
    for (let index = 0; index < 3; index++) {
      const stem = cylinder(0.008, 0.48 + index * 0.06, [x + (index - 1) * 0.04, y + 0.4, z], wood);
      stem.rotation.z = (index - 1) * 0.22;
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 8), dark);
      leaf.scale.set(0.4, 1.7, 0.7);
      leaf.position.set(x + (index - 1) * 0.1, y + 0.62, z);
      leaf.rotation.z = (index - 1) * 0.35;
      group.add(leaf);
    }
  }

  if (configuration.application === "floor") {
    box("foundation", [width + 0.12, 0.14, depth + 0.12], [0, -0.07, 0], concrete);
    tiledSlab("marble-floor", [width, thickness, depth], [0, thickness / 2, 0], "top");
    box("rear-wall", [width + 0.12, 2.7, 0.08], [0, 1.35, -depth / 2 - 0.04], plaster);
    box("side-wall", [0.08, 2.7, depth + 0.12], [-width / 2 - 0.04, 1.35, 0], plaster);

    if (width >= 2.4 && depth >= 2) {
      const sofaWidth = Math.min(1.8, width * 0.48);
      const sofaX = width * 0.12;
      const sofaZ = -depth / 2 + 0.5;
      box("sofa-base", [sofaWidth, 0.18, 0.64], [sofaX, 0.18, sofaZ], dark);
      box("sofa-cushion", [sofaWidth, 0.19, 0.7], [sofaX, 0.36, sofaZ], fabric);
      box("sofa-back", [sofaWidth, 0.48, 0.14], [sofaX, 0.55, sofaZ - 0.29], fabric);
      box("sofa-arm", [0.13, 0.3, 0.7], [sofaX + sofaWidth / 2, 0.43, sofaZ], fabric);
      const tableX = -width / 2 + 0.5;
      cylinder(0.23, 0.04, [tableX, 0.5, sofaZ], wood);
      cylinder(0.065, 0.48, [tableX, 0.24, sofaZ], dark);
      vase(tableX, 0.52, sofaZ);
      const art = box("wall-art", [Math.min(1.15, width * 0.3), 1.08, 0.025], [-width * 0.2, 1.66, -depth / 2 + 0.025], wood);
      box("art-inset", [art.geometry.parameters.width - 0.07, 1.01, 0.014], [-width * 0.2, 1.66, -depth / 2 + 0.045], fabric);
    }
  } else if (configuration.application === "wall") {
    const roomDepth = 2.1;
    box("foundation", [width + 0.12, 0.13, roomDepth], [0, -0.065, 0.2], concrete);
    box("side-wall", [0.08, depth, roomDepth], [-width / 2 - 0.04, depth / 2, 0.2], plaster);
    tiledSlab("marble-wall", [width, depth, thickness], [0, depth / 2, -0.85], "front");
    if (width > 2.2) {
      const benchWidth = Math.min(1.65, width * 0.58);
      bench(width * 0.08, -0.48, benchWidth);
      vase(width * 0.08 + benchWidth * 0.3, 0.55, -0.48);
      box("wall-light", [0.055, Math.min(depth * 0.3, 0.7), 0.08], [-width * 0.35, depth * 0.62, -0.78], brass);
    }
  } else if (configuration.application === "countertop") {
    const baseWidth = Math.max(0.4, width - 0.14);
    const baseDepth = Math.max(0.28, depth - 0.13);
    box("foundation", [Math.max(2.8, width + 0.8), 0.1, Math.max(2.1, depth + 1.4)], [0, -0.05, 0], plaster);
    box("island-plinth", [baseWidth - 0.08, 0.08, baseDepth - 0.06], [0, 0.04, 0], dark);
    box("island", [baseWidth, 0.8, baseDepth], [0, 0.48, 0], wood);
    for (let index = 0; index < Math.floor(baseWidth / 0.09); index++) {
      box("cabinet-reed", [0.012, 0.77, 0.016], [-baseWidth / 2 + 0.045 + index * 0.09, 0.48, baseDepth / 2 + 0.006], concrete);
    }
    slab("marble-countertop", [width, thickness, depth], [0, 0.88 + thickness / 2, 0]);
    vase(-width * 0.28, 0.88 + thickness, -depth * 0.1);
    if (width >= 1.5) {
      for (const x of [-width * 0.25, width * 0.25]) {
        const z = depth / 2 + 0.38;
        cylinder(0.18, 0.055, [x, 0.62, z], fabric);
        for (const side of [-1, 1]) box("stool-leg", [0.035, 0.59, 0.035], [x + side * 0.11, 0.295, z], dark);
        box("stool-footrest", [0.26, 0.025, 0.025], [x, 0.23, z], brass);
      }
    }
  } else {
    const totalDepth = depth * configuration.steps;
    const rise = configuration.riseCm / 100;
    box("foundation", [width + 0.8, 0.1, totalDepth + 0.5], [0, -0.05, 0], plaster);
    const treadMaterial = stoneSurface(configuration.lengthCm, configuration.widthCm);
    const riserMaterial = stoneSurface(configuration.lengthCm, configuration.riseCm);
    for (let index = 0; index < configuration.steps; index++) {
      const height = (index + 1) * rise;
      const z = totalDepth / 2 - (index + 0.5) * depth;
      box("stair-support", [width - 0.025, height, depth - 0.018], [0, height / 2, z - 0.009], concrete);
      slab(`marble-tread-${index}`, [width, thickness, depth], [0, height + thickness / 2, z], treadMaterial);
      slab(`marble-riser-${index}`, [width, rise, thickness], [0, height - rise / 2, z + depth / 2 - thickness / 2], riserMaterial, "front");
    }
  }
  return group;
}

export function disposeMarbleModel(model: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      materials.add(material);
      if ("map" in material && material.map instanceof THREE.Texture) textures.add(material.map);
    }
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  for (const texture of textures) texture.dispose();
}
