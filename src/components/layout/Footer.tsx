

import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black py-10 text-center text-white">
     
    
     
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-20 md:grid-cols-3">

        <div>

          <h2 className="mb-6 text-3xl font-bold">

            ES STONE IKE

          </h2>

          <p className="text-stone-400 leading-8">

            Premium Greek natural marble
            for architectural and luxury
            construction projects worldwide.

          </p>

        </div>

        <div>

          <h3 className="mb-6 text-xl">

            Navigation

          </h3>

          <div className="space-y-3">

            <Link to="/">Home</Link><br/>

            <Link to="/products">Products</Link><br/>

            <Link to="/projects">Projects</Link><br/>

            <Link to="/history">History</Link><br/>

            <Link to="/contact">Contact</Link>

          </div>

        </div>

        <div>

          <h3 className="mb-6 text-xl">

            Contact

          </h3>

          <p className="leading-8 text-stone-400">

            Drama, Greece

            <br/>

            esstoneco@gmail.com

            <br/>

            

          </p>

        </div>

      </div>

      <br />
      


      <div className="border-t border-stone-800 py-6 text-center text-stone-500">

        © 2026 ES STONE IKE. All Rights Reserved.

      </div>
    </footer>
  );
}
