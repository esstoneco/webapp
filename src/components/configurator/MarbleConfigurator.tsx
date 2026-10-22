import { Component, Suspense, lazy, useCallback, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck, FaDownload, FaMinus, FaPlus, FaRedo } from "react-icons/fa";
import { products } from "../../data/products";
import { useText } from "../../i18n/useText";
import { configuratorCopy, configurationSummary, formatMeasurement } from "./configuratorCopy";
import { APPLICATIONS, DEFAULT_CONFIGURATION, DIMENSION_LIMITS, MARBLE_SLUGS, PREVIEW_CONTRAST, changeApplication, configurationMeasurements, configurationQuery, isTiled } from "./marbleConfiguration";
import type { Application, CameraView, MarbleConfiguration, MarbleSlug } from "./marbleConfiguration";
import type { MarbleSceneHandle, PreviewStatus } from "./MarbleScene";
import "./marble-configurator.css";

const MarbleScene = lazy(() => import("./MarbleScene"));

class PreviewBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function ApplicationIcon({ application }: { application: Application }) {
  const paths: Record<Application, ReactNode> = {
    floor: <><path d="m3 14 9-5 9 5-9 5zM3 18l9 5 9-5M7.5 11.5l9 5M12 9v10" /></>,
    wall: <><path d="M4 3h16v18H4zM4 9h16M4 15h16M12 3v6M9 9v6M15 15v6" /></>,
    countertop: <><path d="M2 6h20v3H2zM5 9v12M19 9v12M5 17h14M12 9v8" /></>,
    stairs: <><path d="M2 21h5v-6h5V9h5V3h5M2 22h20V3" /></>,
  };
  return <svg viewBox="0 0 24 26" width="25" height="27" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[application]}</svg>;
}

interface DimensionInputProps {
  label: string;
  value: number;
  limits: readonly [number, number];
  unit?: string;
  adjust: string;
  onChange: (value: number) => void;
}

function DimensionInput({ label, value, limits, unit = "", adjust, onChange }: DimensionInputProps) {
  const id = useId();
  const [draft, setDraft] = useState(String(value));
  const [minimum, maximum] = limits;
  useEffect(() => { setDraft(String(value)); }, [value]);
  const invalid = draft === "" || !Number.isInteger(Number(draft)) || Number(draft) < minimum || Number(draft) > maximum;
  function commit() {
    const parsed = draft.trim() === "" ? value : Number(draft);
    const next = Math.max(minimum, Math.min(maximum, Math.round(Number.isFinite(parsed) ? parsed : value)));
    setDraft(String(next));
    onChange(next);
  }
  
  return (
    <div className="mc-dimension">
      <div className="mc-dimension-heading">
        <label htmlFor={id}>{label}</label>
        <div className="mc-number-wrap">
          <input id={id} type="number" min={minimum} max={maximum} step="1" required value={draft}
            aria-invalid={invalid || undefined} aria-describedby={`${id}-range`}
            onChange={(event) => {
              const next = event.target.value;
              setDraft(next);
              const parsed = Number(next);
              if (next !== "" && Number.isInteger(parsed) && parsed >= minimum && parsed <= maximum) onChange(parsed);
            }}
            onBlur={commit} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); event.currentTarget.blur(); } }} />
          {unit && <span>{unit}</span>}
        </div>
      </div>
      <input className="mc-range" type="range" min={minimum} max={maximum} step="1" value={value}
        aria-label={`${adjust} ${label}`} aria-valuetext={`${value} ${unit}`}
        onChange={(event) => onChange(Number(event.target.value))} />
      <div className="mc-range-bounds" id={`${id}-range`}><span>{minimum} {unit}</span><span>{maximum} {unit}</span></div>
    </div>
  );
}

export default function MarbleConfigurator() {
  const { i18n } = useTranslation();
  const tr = useText();
  const language = i18n.resolvedLanguage ?? "en";
  const copy = configuratorCopy(language);
  const [configuration, setConfiguration] = useState<MarbleConfiguration>({ ...DEFAULT_CONFIGURATION });
  const [status, setStatus] = useState<PreviewStatus>("loading");
  const [showPreview, setShowPreview] = useState(false);
  const [retry, setRetry] = useState(0);
  const [view, setView] = useState<CameraView>("perspective");
  const [contrastPercent, setContrastPercent] = useState<number>(PREVIEW_CONTRAST.default);
  const contrastId = useId();
  const section = useRef<HTMLElement>(null);
  const scene = useRef<MarbleSceneHandle>(null);
  const product = products.find((item) => item.slug === configuration.productSlug)!;
  const materialProducts = products.filter((item) => MARBLE_SLUGS.includes(item.slug as MarbleSlug));
  const measurements = configurationMeasurements(configuration);
  const tiled = isTiled(configuration.application);
  const limits = DIMENSION_LIMITS[configuration.application];
  const fallback = status === "unavailable" || status === "texture-error";
  const onUnavailable = useCallback(() => setStatus("unavailable"), []);
  const number = (value: number) => formatMeasurement(value, language);
  const dimensionLabels: Record<Application, [string, string]> = {
    floor: [copy.dimensionLabels.floorLength, copy.dimensionLabels.floorWidth],
    wall: [copy.dimensionLabels.wallWidth, copy.dimensionLabels.wallHeight],
    countertop: [copy.dimensionLabels.counterLength, copy.dimensionLabels.counterDepth],
    stairs: [copy.dimensionLabels.stairWidth, copy.dimensionLabels.treadDepth],
  };

  useEffect(() => {
    if (!section.current) return;
    if (typeof IntersectionObserver === "undefined") { setShowPreview(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShowPreview(true); observer.disconnect(); }
    }, { rootMargin: "280px" });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  function update(patch: Partial<MarbleConfiguration>) {
    setShowPreview(true);
    setConfiguration((previous) => Object.entries(patch).every(([key, value]) => previous[key as keyof MarbleConfiguration] === value) ? previous : { ...previous, ...patch });
  }
  function selectView(next: CameraView) { setView(next); scene.current?.setView(next); }
  function saveSpecification() {
    const summary = configurationSummary(configuration, tr(product.name), language);
    const url = URL.createObjectURL(new Blob(["\uFEFF", summary], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "es-stone-marble-specification.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <section id="marble-studio" className="marble-configurator" ref={section} aria-labelledby="marble-studio-title">
      <div className="mc-container">
        <header className="mc-header">
          <div><p className="mc-eyebrow">{copy.eyebrow}</p><h2 id="marble-studio-title">{copy.title}</h2></div>
          <p className="mc-intro">{copy.subtitle}</p>
        </header>

        <div className="mc-workspace">
          <div className="mc-preview-column">
            <div className="mc-preview">
              <div className="mc-preview-heading">
                <span className="mc-live"><span aria-hidden="true" />{copy.live}</span>
                <span className="mc-stone-chip">{tr(product.name)}</span>
              </div>
              <div className="mc-preview-caption">
                <h3>{copy.applications[configuration.application]}</h3>
                <p>{configuration.lengthCm} × {configuration.widthCm} {copy.cm}{configuration.application === "stairs" ? ` · ${configuration.steps} ${copy.dimensionLabels.steps.toLocaleLowerCase(language)}` : ""}</p>
              </div>
              <div className={`mc-scene-layer${fallback ? " mc-scene-hidden" : ""}`} aria-hidden={fallback || undefined}>
                {showPreview && (
                  <PreviewBoundary key={retry} onUnavailable={onUnavailable}>
                    <Suspense fallback={null}>
                      <MarbleScene ref={scene} configuration={configuration} contrastPercent={contrastPercent} label={`${copy.applications[configuration.application]} — ${tr(product.name)}. ${copy.keyboardHint}`} onStatus={setStatus} />
                    </Suspense>
                  </PreviewBoundary>
                )}
              </div>
              {fallback && (
                <div className="mc-fallback">
                  <img src={product.image} alt={`${copy.fallback}: ${tr(product.name)}`} />
                  <p>{status === "texture-error" ? copy.textureError : copy.unavailable}</p>
                  <button type="button" onClick={() => { setStatus("loading"); setRetry((value) => value + 1); }}>{copy.retry}</button>
                </div>
              )}
              {!fallback && status === "loading" && <p className="mc-loading" role="status"><span aria-hidden="true" />{showPreview ? copy.updating : copy.loading}</p>}
              <div className="mc-preview-toolbar">
                <div className="mc-view-buttons" role="group" aria-label={copy.perspective}>
                  <button type="button" aria-pressed={view === "perspective"} disabled={fallback || status !== "ready"} onClick={() => selectView("perspective")}>{copy.perspective}</button>
                  <button type="button" aria-pressed={view === "surface"} disabled={fallback || status !== "ready"} onClick={() => selectView("surface")}>{copy.surfaceView}</button>
                </div>
                <div className="mc-camera-buttons">
                  <button type="button" aria-label={copy.zoomOut} title={copy.zoomOut} disabled={fallback || status !== "ready"} onClick={() => scene.current?.zoom(1.18)}><FaMinus /></button>
                  <button type="button" aria-label={copy.zoomIn} title={copy.zoomIn} disabled={fallback || status !== "ready"} onClick={() => scene.current?.zoom(0.85)}><FaPlus /></button>
                  <button type="button" aria-label={copy.resetView} title={copy.resetView} disabled={fallback || status !== "ready"} onClick={() => { setView("perspective"); scene.current?.reset(); }}><FaRedo /></button>
                </div>
              </div>
            </div>
            <div className="mc-contrast-control">
              <div className="mc-contrast-heading">
                <label htmlFor={contrastId}>{copy.contrast}</label>
                <output htmlFor={contrastId}>{number(contrastPercent)}%</output>
              </div>
              <input id={contrastId} className="mc-range" type="range" min={PREVIEW_CONTRAST.minimum} max={PREVIEW_CONTRAST.maximum} step="1"
                value={contrastPercent} aria-valuetext={`${number(contrastPercent)}%`} aria-describedby={`${contrastId}-hint`}
                disabled={fallback}
                onChange={(event) => { setShowPreview(true); setContrastPercent(Number(event.target.value)); }} />
              <div className="mc-contrast-footer">
                <span id={`${contrastId}-hint`}>{copy.originalContrast}</span>
                <button type="button" disabled={contrastPercent === PREVIEW_CONTRAST.default} onClick={() => setContrastPercent(PREVIEW_CONTRAST.default)}>{copy.resetContrast}</button>
              </div>
            </div>
            {!fallback && <p className="mc-gesture-hint">{copy.dragHint}</p>}
            <p className="mc-preview-note">{copy.previewNote}</p>
          </div>

          <div className="mc-controls">
            <fieldset className="mc-fieldset">
              <legend><span>01</span>{copy.stone}</legend>
              <div className="mc-material-grid">
                {materialProducts.map((item) => (
                  <button key={item.slug} type="button" className="mc-material" aria-pressed={configuration.productSlug === item.slug} onClick={() => update({ productSlug: item.slug as MarbleSlug })}>
                    <span className="mc-swatch"><img src={item.image} alt="" loading="lazy" />{configuration.productSlug === item.slug && <span className="mc-selected-check"><FaCheck aria-hidden="true" /></span>}</span>
                    <span>{tr(item.name)}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mc-fieldset">
              <legend><span>02</span>{copy.installation}</legend>
              <div className="mc-application-grid">
                {APPLICATIONS.map((application) => (
                  <button key={application} type="button" aria-pressed={configuration.application === application}
                    onClick={() => { setShowPreview(true); if (configuration.application !== application) setConfiguration(changeApplication(configuration, application)); }}>
                    <ApplicationIcon application={application} /><span>{copy.applications[application]}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mc-fieldset">
              <legend><span>03</span>{copy.dimensions}</legend>
              <DimensionInput key={`${configuration.application}-length`} label={dimensionLabels[configuration.application][0]} value={configuration.lengthCm} limits={limits.length} unit={copy.cm} adjust={copy.adjust} onChange={(value) => update({ lengthCm: value })} />
              <DimensionInput key={`${configuration.application}-width`} label={dimensionLabels[configuration.application][1]} value={configuration.widthCm} limits={limits.width} unit={copy.cm} adjust={copy.adjust} onChange={(value) => update({ widthCm: value })} />
              {configuration.application === "stairs" && <>
                <DimensionInput label={copy.dimensionLabels.steps} value={configuration.steps} limits={[3, 16]} adjust={copy.adjust} onChange={(value) => update({ steps: value })} />
                <DimensionInput label={copy.dimensionLabels.rise} value={configuration.riseCm} limits={[10, 22]} unit={copy.cm} adjust={copy.adjust} onChange={(value) => update({ riseCm: value })} />
              </>}
            </fieldset>

            <fieldset className="mc-fieldset mc-finishes">
              <legend><span>04</span>{copy.details}</legend>
              <div className="mc-select-grid">
                <label>{copy.thickness}<select value={configuration.thicknessCm} onChange={(event) => update({ thicknessCm: Number(event.target.value) as 2 | 3 })}><option value="2">2 {copy.cm}</option><option value="3">3 {copy.cm}</option></select></label>
                <label>{copy.finish}<select value={configuration.finish} onChange={(event) => update({ finish: event.target.value as MarbleConfiguration["finish"] })}><option value="polished">{copy.polished}</option><option value="honed">{copy.honed}</option></select></label>
                {tiled && <>
                  <label>{copy.tileSize}<select value={configuration.tileSize} onChange={(event) => update({ tileSize: event.target.value as MarbleConfiguration["tileSize"] })}>{["60x60", "60x120", "80x80"].map((size) => <option key={size} value={size}>{size.replace("x", " × ")} {copy.cm}</option>)}</select></label>
                  <label>{copy.layout}<select value={configuration.layout} onChange={(event) => update({ layout: event.target.value as MarbleConfiguration["layout"] })}><option value="straight">{copy.straight}</option><option value="staggered">{copy.staggered}</option></select></label>
                </>}
              </div>
              <div className="mc-vein-control"><span>{copy.veinDirection}</span><div className="mc-segmented" role="group" aria-label={copy.veinDirection}><button type="button" aria-pressed={configuration.veinDirection === 0} onClick={() => update({ veinDirection: 0 })}>{copy.original}</button><button type="button" aria-pressed={configuration.veinDirection === 90} onClick={() => update({ veinDirection: 90 })}>{copy.crosswise}</button></div></div>
              <DimensionInput label={copy.allowance} value={configuration.wastePercent} limits={[0, 25]} unit="%" adjust={copy.adjust} onChange={(value) => update({ wastePercent: value })} />
            </fieldset>

            <div className="mc-summary" aria-live="polite" aria-atomic="true">
              <div><span>{copy.coverage}</span><strong>{number(measurements.areaM2)} <small>m²</small></strong></div>
              <div><span>{copy.orderArea} · {configuration.wastePercent}%</span><strong>{number(measurements.orderM2)} <small>m²</small></strong></div>
              {tiled && <p>{copy.approximateTiles}: <b>{measurements.approximateTiles}</b></p>}
            </div>
            <p className="mc-estimate-note">{configuration.application === "stairs" ? `${copy.stairNote} ` : configuration.application === "countertop" ? `${copy.counterNote} ` : ""}{copy.allowanceNote}</p>
            <Link className="mc-quote-button" to={`/contact?${configurationQuery(configuration)}`}>{copy.quote}<FaArrowRight aria-hidden="true" /></Link>
            <button type="button" className="mc-download-button" onClick={saveSpecification}><FaDownload aria-hidden="true" />{copy.download}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
