
type Props={

title:string;

location:string;

year:string;

category:string;

marble:string;

description:string;

image:string;

};

export default function ProjectCard({

title,

location,

year,

category,

marble,

description,

image

}:Props){

return(

<div className="overflow-hidden rounded-3xl bg-white shadow-xl transition duration-300 hover:-translate-y-2">

<div className="overflow-hidden">

<img

src={image}

alt={title}

className="h-80 w-full object-cover transition duration-700 hover:scale-110"

/>

</div>

<div className="space-y-4 p-8">

<span className="rounded-full bg-stone-200 px-4 py-2 text-sm">

{category}

</span>

<h2 className="text-3xl font-bold">

{title}

</h2>

<p className="text-gray-600">

{description}

</p>

<div className="grid grid-cols-2 gap-4 text-sm">

<div>

<strong>Location</strong>

<p>{location}</p>

</div>

<div>

<strong>Year</strong>

<p>{year}</p>

</div>

<div>

<strong>Marble</strong>

<p>{marble}</p>

</div>

</div>

<Link
            to="/projects"
            className="rounded-full bg-black px-6 py-3 text-white"
          >
       </Link>




</div>

</div>

);

}
