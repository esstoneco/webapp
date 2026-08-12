import Button from "../common/Button";

export default function CTA(){

return(

<section className="bg-stone-900 py-32 text-center text-white">

<h2 className="mb-8 text-6xl font-bold">

Ready for your next project?

</h2>

<a
href="/contact"
className=""
>

<Button>Request Quote</Button>

<Button variant="secondary">
  Learn More
</Button>


</a>

</section>

);

}