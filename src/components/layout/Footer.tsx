import { useText } from "../../i18n/useText";


import {Link} from "react-router-dom";

export default function Footer() {
  const tr = useText();

  return (
    <footer className="bg-black py-10 text-center text-white">
     
    
     
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-20 md:grid-cols-3">

        <div>

          <h2 className="mb-6 text-3xl font-bold">

            {tr("ES STONE IKE")}</h2>

          <p className="text-stone-400 leading-8">

            {tr("Premium Greek natural marble for architectural and luxury construction projects worldwide.")}</p>

        </div>

        <div>

          <h3 className="mb-6 text-xl">

            {tr("Navigation")}</h3>

          <div className="space-y-3">

            <Link to="/">{tr("Home")}</Link><br/>

            <Link to="/products">{tr("Products")}</Link><br/>

            <Link to="/projects">{tr("Projects")}</Link><br/>

            <Link to="/history">{tr("History")}</Link><br/>

            <Link to="/contact">{tr("Contact")}</Link>

          </div>

        </div>

        <div>

          <h3 className="mb-6 text-xl">

            {tr("Contact")}</h3>

          <p className="leading-8 text-stone-400">

            {tr("Drama, Greece")}<br/>

            {tr("esstoneco@gmail.com")}<br/>

            

          </p>

        </div>

      </div>

      <br />
      


      <div className="border-t border-stone-800 py-6 text-center text-stone-500">

        {tr("© 2026 ES STONE IKE. All Rights Reserved.")}</div>
    </footer>
  );
}
