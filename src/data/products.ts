import type { Product } from "../../src/types/product";

import extraWhite from "../assets/images/products/extra-white.jpg";
import whiteVeins from "../assets/images/products/white-veins.jpg";
import blackVeins from "../assets/images/products/black-veins.jpg";
import pinkVeins from "../assets/images/products/pink-veins.jpg";

export const products: Product[] = [
  {
    id: 1,
    slug: "extra-white",
    name: "Extra White",
    image: extraWhite,
    gallery: [
      extraWhite,
      extraWhite,
      extraWhite,
    ],
    category: "Slabs",

    description:
      "Extra White Nestos Marble is a premium natural stone characterized by its bright white appearance and elegant crystalline structure. It is suitable for demanding architectural and interior applications.",

    applications: [
      "Luxury Hotels",
      "Bathrooms",
      "Kitchen Countertops",
      "Wall Cladding",
      "Flooring",
      "Exterior Facades",
    ],

    specifications: {
      origin: "Nestos, Greece",
      material: "Natural Marble",
      finish: "Polished / Honed",
      density: "2.71 g/cm³",
      waterAbsorption: "0.18%",
      compressiveStrength: "132 MPa",
    },
  },

  {
    id: 2,
    slug: "white-veins",
    name: "White Veins",
    image: whiteVeins,
    gallery: [
      whiteVeins,
      whiteVeins,
      whiteVeins,
    ],
    category: "Tiles",

    description:
      "White Veins marble combines a clean white background with distinctive natural veining, creating an elegant material for contemporary architectural spaces.",

    applications: [
      "Living Rooms",
      "Bathrooms",
      "Hotels",
      "Wall Cladding",
      "Flooring",
    ],

    specifications: {
      origin: "Nestos, Greece",
      material: "Natural Marble",
      finish: "Polished / Honed",
      density: "2.71 g/cm³",
      waterAbsorption: "0.18%",
      compressiveStrength: "132 MPa",
    },
  },

  {
    id: 3,
    slug: "black-veins",
    name: "Black Veins",
    image: blackVeins,
    gallery: [
      blackVeins,
      blackVeins,
      blackVeins,
    ],
    category: "Slabs",

    description:
      "Black Veins marble features dramatic dark veining across a light natural stone background, making it suitable for distinctive luxury interiors.",

    applications: [
      "Luxury Villas",
      "Reception Areas",
      "Hotels",
      "Feature Walls",
      "Bathrooms",
    ],

    specifications: {
      origin: "Nestos, Greece",
      material: "Natural Marble",
      finish: "Polished / Honed",
      density: "2.71 g/cm³",
      waterAbsorption: "0.18%",
      compressiveStrength: "132 MPa",
    },
  },

  {
    id: 4,
    slug: "pink-veins",
    name: "Pink Veins",
    image: pinkVeins,
    gallery: [
      pinkVeins,
      pinkVeins,
      pinkVeins,
    ],
    category: "Blocks",

    description:
      "Pink Veins marble presents subtle pink natural veining within a refined white stone background, providing a distinctive character for bespoke architectural projects.",

    applications: [
      "Luxury Interiors",
      "Bathrooms",
      "Hotels",
      "Monuments",
      "Custom Projects",
    ],

    specifications: {
      origin: "Nestos, Greece",
      material: "Natural Marble",
      finish: "Polished / Honed",
      density: "2.71 g/cm³",
      waterAbsorption: "0.18%",
      compressiveStrength: "132 MPa",
    },
  },
];