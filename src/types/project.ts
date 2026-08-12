export interface Project {
  id: number;
  slug: string;

  title: string;
  location: string;
  year: string;
  category: string;

  marble: string;

  image: string;
  gallery: string[];

  description: string;

  scope: string[];

  client?: string;
}