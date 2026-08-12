type Props={

active:string;

setActive:(category:string)=>void;

};

const categories=[

"All",

"Hotels",

"Residential",

"Kitchen",

"Bathroom",

"Commercial",

"Flooring"

];

export default function ProjectFilter({

active,

setActive

}:Props){

return(

<div className="mb-16 flex flex-wrap justify-center gap-4">

{

categories.map(category=>(

<button

key={category}

onClick={()=>setActive(category)}

className={`rounded-full px-6 py-3 transition

${

active===category

?

"bg-black text-white"

:

"bg-stone-200"

}

`}

>

{category}

</button>

))

}

</div>

);

}