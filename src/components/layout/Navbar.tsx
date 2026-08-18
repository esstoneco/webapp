import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "History", path: "/history" },
  { name: "Projects", path: "/analysis" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">

        <div className="mx-auto max-w-7xl px-8">

          <div className="mt-4 rounded-full border border-white/20 bg-black/30 backdrop-blur-xl">

            <div className="flex h-20 items-center justify-between px-8">

              <Link
                to="/"
                className="text-2xl font-bold tracking-wide text-white"
              >
                ES STONE IKE
              </Link>

              <nav className="hidden gap-10 lg:flex">

                {links.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `transition ${
                        isActive
                          ? "text-white"
                          : "text-gray-300 hover:text-white"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

              </nav>

              <button
                onClick={() => setOpen(!open)}
                className="text-2xl text-white lg:hidden"
              >
                {open ? <FaTimes /> : <FaBars />}
              </button>

            </div>

          </div>

        </div>

      </header>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 lg:hidden"
          >

            <div className="flex h-full flex-col items-center justify-center gap-10">

              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="text-3xl text-white"
                >
                  {link.name}
                </NavLink>
              ))}

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}