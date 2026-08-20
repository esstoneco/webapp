import type { Project } from "../types/project";

// Temporary images.
// Replace these imports with your actual project photographs later.

import project1 from "../assets/images/projects/bathrrom.jpg";
import project2 from "../assets/images/projects/commercial1.jpg";
import project3 from "../assets/images/projects/flooring1.jpg";
import project4 from "../assets/images/projects/hotel1.jpg";


export const projects: Project[] = [
  {
    id: 1,

    slug: "luxury-hotel-athens",

    title: "Luxury Hotel Athens",

    location: "Athens, Greece",

    year: "2025",

    category: "Hospitality",

    marble: "Nestos Extra White",

    image: ".../assets/images/projects/bathrrom.jpg",

    gallery: [
      project1,
      project1,
      project1,
      project1,
    ],

    description:
      "A contemporary hospitality project featuring Greek marble throughout selected interior and architectural spaces. The project combines natural stone with modern architectural detailing to create a refined and timeless environment.",

    scope: [
      "Interior Marble",
      "Flooring",
      "Wall Cladding",
      "Bathrooms",
      "Custom Fabrication",
    ],

    client: "Private Client",
  },

  {
    id: 2,

    slug: "private-villa-mykonos",

    title: "Private Villa Mykonos",

    location: "Mykonos, Greece",

    year: "2024",

    category: "Residential",

    marble: "Nestos White Veins",

    image: project2,

    gallery: [
      project2,
      project2,
      project2,
      project2,
    ],

    description:
      "A private residential project where natural Greek marble was used to create elegant interior and exterior architectural elements.",

    scope: [
      "Bathrooms",
      "Kitchen",
      "Flooring",
      "Exterior Areas",
      "Custom Elements",
    ],

    client: "Private Client",
  },

  {
    id: 3,

    slug: "modern-residence-thessaloniki",

    title: "Modern Residence",

    location: "Thessaloniki, Greece",

    year: "2024",

    category: "Residential",

    marble: "Nestos Black Veins",

    image: project3,

    gallery: [
      project3,
      project3,
      project3,
      project3,
    ],

    description:
      "A modern residential project using distinctive marble veining as an architectural feature across selected interior spaces.",

    scope: [
      "Feature Walls",
      "Bathrooms",
      "Flooring",
      "Staircases",
      "Interior Details",
    ],

    client: "Private Client",
  },

  {
    id: 4,

    slug: "commercial-project",

    title: "Contemporary Commercial Space",

    location: "Greece",

    year: "2023",

    category: "Commercial",

    marble: "Nestos Pink Veins",

    image: project4,

    gallery: [
      project4,
      project4,
      project4,
      project4,
    ],

    description:
      "A commercial interior project incorporating natural Greek marble into architectural surfaces and bespoke design elements.",

    scope: [
      "Reception",
      "Wall Cladding",
      "Flooring",
      "Custom Fabrication",
    ],

    client: "Commercial Client",
  },
];