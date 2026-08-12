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

  color: string;
  finish: string;
  origin: string;

  featured?: boolean;
}