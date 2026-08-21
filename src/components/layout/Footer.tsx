

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
      <br />
      <br /><br />
      <br />
		{ /* <div className="flex items-center justify-center min-h-screen">
            <div className="col-md-4" >
                <h4 data-i18n="ike_title">Στοιχεία Δημοσιότητας Ι.Κ.Ε.</h4>
                <ul>
                    <li><strong data-i18n="company_name_label">Επωνυμία:</strong> <span data-i18n="company_name">ES-STONE ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.</span></li>
                    <li><strong data-i18n="company_distinct_label">Διακριτικός Τίτλος:</strong> <span data-i18n="company_distinct">ES STONE Ι.Κ.Ε.</span></li>
                    <li><strong data-i18n="company_address_label">Έδρα:</strong> <span data-i18n="company_address">[ΤΡΙΚΟΥΠΗ 5 / ΔΡΑΜΑ]</span></li>
                    <li><strong data-i18n="company_vat_label">Α.Φ.Μ.:</strong> <span data-i18n="company_vat">803256732</span> (<span data-i18n="company_tax_office">ΔΟΥ</span>: <span data-i18n="tax_office_name">[Όνομα ΔΟΥ]</span>)</li>
                    <li><strong data-i18n="company_gemi_label">Αριθμός Γ.Ε.ΜΗ.:</strong> <span data-i18n="company_gemi">193199319000</span></li>
                    <li><strong data-i18n="company_chamber_label">Επιμελητήριο:</strong> <span data-i18n="company_chamber">[ΕΠΙΜΕΛΗΤΗΡΙΟ ΔΡΑΜΑΣ]</span></li>
                </ul>
            </div>

            <div className="col-md-4">
                <h4 data-i18n="company_structure_title">Εταιρική Σύνθεση &amp; Κεφάλαιο</h4>
                <ul >
                    <li><strong data-i18n="company_capital_label">Συνολικό Κεφάλαιο:</strong> <span data-i18n="company_capital">[5000]</span> €</li>
                    <li><strong data-i18n="company_manager_label">Διαχειριστής:</strong> <span data-i18n="company_manager">[Πύρρος Νικόπουλος]</span></li>
                    <li><strong data-i18n="partners_label">Εταίροι &amp; Εισφορές:</strong></li>
                   {/*<li>- <span data-i18n="partner1">[Όνομα Εταίρου 1]</span></li>
                    <li>- <span data-i18n="partner2">[Όνομα Εταίρου 2]</span></li>*/}
                    <li><strong data-i18n="company_kad_label">Κ.Α.Δ.:</strong> <span data-i18n="company_kad">[46830614,46830631]</span></li>
                    {/*<li><a href="biochelanal.html"><h5 data-i18n="strengthanalysis">Physical Strength Analysis</h5></a></li>*/}
					
                </ul>
            </div>
             <div  className="col-md-4">
                <h4 data-i18n="documents_title">Έγγραφα &amp; Πολιτικές</h4>
                <ul>
                    <li><strong data-i18n="financial_statements_label">Οικονομικές Καταστάσεις:</strong></li>
                    <li><a href="downloads/isologismos-2025.pdf" target="_blank" data-i18n="balance_2025">Ισολογισμός 2026</a></li>
                    <li ><strong data-i18n="legal_label">Νομικά:</strong></li>
                    <li><a href="privacy-policy.html" data-i18n="privacy_policy">Πολιτική Απορρήτου</a></li>
                    <li><a href="cookies-policy.html" data-i18n="cookies_policy">Cookies</a></li>
                    <li><a href="terms.html" data-i18n="terms_use">Όροι Χρήσης</a></li>
                    
                    
                </ul>
            </div>

        </div>
        
	  */}

      <div className="border-t border-stone-800 py-6 text-center text-stone-500">

        © 2026 ES STONE IKE. All Rights Reserved.

      </div>
    </footer>
  );
}
