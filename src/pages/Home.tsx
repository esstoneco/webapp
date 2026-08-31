import Hero from "../components/home/Hero";
import About from "../components/home/About";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Statistics from "../components/home/Statistics";
import CTA from "../components/home/CTA";
import WhyChooseUs from "../components/home/WhyChooseUs"; 
import FadeIn from "../components/common/FadeIn";
import ProjectsPreview from "../components/home/ProjectsPreview";
import PageBanner from "../components/common/PagaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <PageBanner
  title="Our Projects"
  subtitle="Discover our completed marble installations"
/>
      <FadeIn>

<About/>

</FadeIn>

<FadeIn>

<FeaturedProducts/>

</FadeIn>

<FadeIn>

<WhyChooseUs/>

</FadeIn>

<FadeIn>

<ProjectsPreview/>

</FadeIn>
      <Statistics />
      <CTA />
    </>
  );
}
