import * as THREE from "three";
import extraWhite from "../../assets/images/products/extra-white.jpg";
import whiteVeins from "../../assets/images/products/white-veins.jpg";
import blackVeins from "../../assets/images/products/black-veins.jpg";
import pinkVeins from "../../assets/images/products/pink-veins.jpg";
import type { MarbleConfiguration, MarbleSlug } from "./marbleConfiguration";

// Vite bundles these local photos and supplies the correct URL for any base path.
export const marbleImages: Record<MarbleSlug, string> = {
  "extra-white": extraWhite,
  "white-veins": whiteVeins,
  "black-veins": blackVeins,
  "pink-veins": pinkVeins,
};

// Every material samples the imported photo itself; no 2D canvas is involved.
export function createMarbleTexture(source: THREE.Texture, widthCm: number, heightCm: number, direction: MarbleConfiguration["veinDirection"]) {
  const texture = source.clone();
  const image = source.image as HTMLImageElement;
  const imageAspect = (image.naturalWidth || image.width) / (image.naturalHeight || image.height);
  const surfaceAspect = direction === 90 ? heightCm / widthCm : widthCm / heightCm;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.center.set(0.5, 0.5);
  texture.rotation = direction === 90 ? Math.PI / 2 : 0;
  // Crop to cover the surface without stretching or flattening the stone veins.
  texture.repeat.set(Math.min(1, surfaceAspect / imageAspect), Math.min(1, imageAspect / surfaceAspect));
  texture.needsUpdate = true;
  return texture;
}
