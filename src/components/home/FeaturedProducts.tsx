import extraWhite from "../../assets/images/products/extra-white.jpg";
import blackVeins from "../../assets/images/products/black-veins.jpg";
import WhiteVeins from "../../assets/images/products/white-veins.jpg";
import pinkVeins from "../../assets/images/products/pink-veins.jpg";


const marbles=[

    {
name:"Extra White",
image:extraWhite
},

{
name:"White Veins",
image:WhiteVeins
},

{
name:"Black Veins",
image:blackVeins
},

{
name:"Pink Veins",
image:pinkVeins
}

];

export default function FeaturedProducts(){

return(

<section className="bg-stone-100 py-24">

<div className="mx-auto max-w-7xl">

<h2 className="mb-12 text-center text-5xl font-bold">

Featured Collection

</h2>

<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

{

marbles.map((item)=>(

<div
key={item.name}
className="overflow-hidden rounded-xl bg-white shadow-lg transition hover:-translate-y-2"
>

<img
src={item.image}
alt={item.name}
/>

<div className="p-6">

<h3 className="text-2xl font-bold">

{item.name}

</h3>

</div>

</div>

))

}

</div>

</div>

</section>

);

}