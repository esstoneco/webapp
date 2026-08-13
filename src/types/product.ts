export interface ProductSpecifications {
  origin: string;
  material: string;
  finish: string;
  density: string;
  waterAbsorption: string;
  compressiveStrength: string;
}

export interface Product {
  id: number;
  slug: string;

  name: string;
  category: string;

  image: string;
  gallery: string[];

  shortDescription: string;
  description: string;

  applications: string[];

  specifications: ProductSpecifications;

  color: string;
  finish: string;
  origin: string;

  featured?: boolean;
}
