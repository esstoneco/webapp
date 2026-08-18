import Button from "../common/Button";
import { Link } from "react-router-dom";

export default function CTA(){

return(

<section className="bg-stone-900 py-32 text-center text-white">

<h2 className="mb-8 text-6xl font-bold">

Ready for your next project?

</h2>

<div className="flex gap-4">
  <Link
    to="/contact"
    >
    Request Quote
  </Link>

  <Link
    to="/about"
  >
    Learn More
  </Link>
</div>

</section>

);

}