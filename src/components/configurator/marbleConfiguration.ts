export const MARBLE_SLUGS = ["extra-white", "white-veins", "black-veins", "pink-veins"] as const;
export const APPLICATIONS = ["floor", "wall", "countertop", "stairs"] as const;
export type MarbleSlug = (typeof MARBLE_SLUGS)[number];
export type Application = (typeof APPLICATIONS)[number];
export type CameraView = "perspective" | "surface";

export const PREVIEW_CONTRAST = { minimum: 50, maximum: 250, default: 170 } as const;

export interface MarbleConfiguration {
  productSlug: MarbleSlug;
  application: Application;
  lengthCm: number;
  widthCm: number;
  thicknessCm: 2 | 3;
  finish: "polished" | "honed";
  tileSize: "60x60" | "60x120" | "80x80";
  layout: "straight" | "staggered";
  veinDirection: 0 | 90;
  wastePercent: number;
  steps: number;
  riseCm: number;
}

export const DIMENSION_LIMITS = {
  floor: { length: [100, 1200], width: [100, 1200] },
  wall: { length: [100, 1000], width: [100, 400] },
  countertop: { length: [60, 400], width: [40, 140] },
  stairs: { length: [60, 240], width: [22, 40] },
} as const;

const applicationDimensions: Record<Application, [number, number]> = {
  floor: [400, 300],
  wall: [400, 260],
  countertop: [240, 65],
  stairs: [120, 30],
};

export const DEFAULT_CONFIGURATION: MarbleConfiguration = {
  productSlug: "white-veins",
  application: "floor",
  lengthCm: 400,
  widthCm: 300,
  thicknessCm: 2,
  finish: "polished",
  tileSize: "60x60",
  layout: "straight",
  veinDirection: 0,
  wastePercent: 10,
  steps: 7,
  riseCm: 17,
};

export function changeApplication(configuration: MarbleConfiguration, application: Application): MarbleConfiguration {
  const [lengthCm, widthCm] = applicationDimensions[application];
  return { ...configuration, application, lengthCm, widthCm };
}

export function isTiled(application: Application) {
  return application === "floor" || application === "wall";
}

export function tileDimensions(tileSize: MarbleConfiguration["tileSize"]): [number, number] {
  return tileSize.split("x").map(Number) as [number, number];
}

export function configurationMeasurements(configuration: MarbleConfiguration) {
  const { lengthCm, widthCm, application, steps, riseCm, wastePercent, tileSize } = configuration;
  // Stair coverage includes treads and risers, excluding sides and landings.
  const areaM2 = application === "stairs"
    ? lengthCm * (widthCm + riseCm) * steps / 10000
    : lengthCm * widthCm / 10000;
  const orderM2 = areaM2 * (1 + wastePercent / 100);
  const [tileWidth, tileHeight] = tileDimensions(tileSize);
  return { areaM2, orderM2, approximateTiles: Math.ceil(orderM2 / (tileWidth * tileHeight / 10000)) };
}

// Keep the complete specification in the URL so the contact enquiry survives a refresh.
export function configurationQuery(configuration: MarbleConfiguration) {
  return new URLSearchParams({ marbleConfig: JSON.stringify({ version: 1, ...configuration }) }).toString();
}

function wholeNumber(value: unknown, minimum: number, maximum: number): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= minimum && value <= maximum;
}

export function parseConfigurationQuery(search: URLSearchParams): MarbleConfiguration | null {
  const serialized = search.get("marbleConfig");
  if (!serialized || serialized.length > 1800) return null;
  try {
    const value = JSON.parse(serialized);
    if (!value || typeof value !== "object" || Array.isArray(value) || value.version !== 1) return null;
    if (!MARBLE_SLUGS.includes(value.productSlug) || !APPLICATIONS.includes(value.application)) return null;
    const limits = DIMENSION_LIMITS[value.application as Application];
    if (!wholeNumber(value.lengthCm, limits.length[0], limits.length[1]) || !wholeNumber(value.widthCm, limits.width[0], limits.width[1])) return null;
    if (![2, 3].includes(value.thicknessCm) || !["polished", "honed"].includes(value.finish)) return null;
    if (!["60x60", "60x120", "80x80"].includes(value.tileSize) || !["straight", "staggered"].includes(value.layout)) return null;
    if (![0, 90].includes(value.veinDirection) || !wholeNumber(value.wastePercent, 0, 25)) return null;
    if (!wholeNumber(value.steps, 3, 16) || !wholeNumber(value.riseCm, 10, 22)) return null;
    // Copy only known fields; never spread arbitrary URL data into application state.
    return {
      productSlug: value.productSlug, application: value.application,
      lengthCm: value.lengthCm, widthCm: value.widthCm, thicknessCm: value.thicknessCm,
      finish: value.finish, tileSize: value.tileSize, layout: value.layout,
      veinDirection: value.veinDirection, wastePercent: value.wastePercent,
      steps: value.steps, riseCm: value.riseCm,
    };
  } catch {
    return null;
  }
}
