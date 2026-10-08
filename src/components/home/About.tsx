import { useText } from "../../i18n/useText";
export default function About() {
  const tr = useText();


return (

<section className="mx-auto max-w-7xl px-8 py-24">

<h2 className="mb-8 text-5xl font-bold">
{tr("Our Story")}</h2>

<p className="text-lg leading-9 text-gray-600">

{tr("ES STONE IKE has been supplying premium Nestos marble for architectural projects, luxury hotels, private residences and commercial buildings.")}</p>

</section>

);

}