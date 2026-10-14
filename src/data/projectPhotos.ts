import { projects } from "./projects";

export interface ProjectPhoto {
  image: string;
  title: string;
  location?: string;
  slug?: string;
}

// Include photos in every project folder, even when they are not yet linked
// in projects.ts. The excluded files are empty placeholders or an exact copy.
const images = import.meta.glob<string>(
  [
    "../assets/images/projects/**/*.{jpg,jpeg,png,webp,avif}",
    "!../assets/images/projects/{bathroom1,commercial1,flooring1,hotel1,kitchen1,villa1}.jpg",
    "!../assets/images/projects/project1/mpanio.jpg",
  ],
  { eager: true, query: "?url", import: "default" },
);

export const projectPhotos: ProjectPhoto[] = [];
const included = new Set<string>();

// Keep the existing project order and show each cover/gallery image once.
for (const project of projects) {
  for (const image of [project.image, ...project.gallery]) {
    if (included.has(image)) continue;
    included.add(image);
    projectPhotos.push({
      image,
      title: project.title,
      location: project.location,
      slug: project.slug,
    });
  }
}

for (const image of Object.values(images)) {
  if (included.has(image)) continue;
  included.add(image);
  projectPhotos.push({ image, title: "Our Projects" });
}
