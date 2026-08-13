import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import History from "../pages/History";
import StrengthAnalysis from "../pages/StrengthAnalysis";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Projects from "../pages/Projects";
import ProductDetails from "../pages/ProductDetails";
import ProjectDetails from "../pages/ProjectDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "history",
        element: <History />
      },
      {
        path: "analysis",
        element: <StrengthAnalysis />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
  path: "projects",
  element: <Projects />
},
{
    path:"products/:slug",
    element:<ProductDetails/>
},
{
  path: "projects/:slug",
  element: <ProjectDetails />,
},
    ],
  },
  {
    path: "*",
    element: <NotFound />
  },
  
]);

export const links = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Projects", path: "/projects" },
  { name: "History", path: "/history" },
  { name: "Analysis", path: "/analysis" },
  { name: "Contact", path: "/contact" },
  
];

