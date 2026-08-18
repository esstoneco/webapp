
import {Link} from "react-router-dom";

export default function CTA(){

return(

<section className="bg-stone-900 py-32 text-center text-white">

<h2 className="mb-8 text-6xl font-bold">

Ready for your next project?

</h2>

<div className="flex gap-4">
  <Link
    to="/contact"
    className="rounded-full px-8 py-4 font-semibold transition duration-300 bg-[#C8A97E] text-white hover:bg-[#b08f65]"
  >
    Request Quote
  </Link>

  <Link
    to="/about"
    className="rounded-full px-8 py-4 font-semibold transition duration-300 border border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-white"
  >
    Learn More
  </Link>
</div>

</section>

);

}