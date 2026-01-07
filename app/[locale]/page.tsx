import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Cta from "@/components/Cta";
import Portfolio from "@/components/Portfolio";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

import Process from "@/components/Process";

import Partners from "@/components/Partners";
import Blog from "@/components/Blog";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Services />
      <Process />
      <About />
      <Stats />
      <Partners />
      <Blog />
      <Faq />
      {/* <Portfolio /> */}
      <Team />
      <Cta />
      <Contact />
    </div>
  );
}
