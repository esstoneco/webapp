import ProjectCard from "webapp/src/components/projects/ProjectCard.tsx";

import { projects } from "../../data/projects";

type Props={

active:string;

};

export default function ProjectsGrid({

active

}:Props){

const filtered=

active==="All"

?

projects

:

projects.filter(

project=>project.category===active

);

return(

<div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

{

filtered.map(project=>(

<ProjectCard

key={project.id}

{...project}

/>

))

}

</div>

);

}
