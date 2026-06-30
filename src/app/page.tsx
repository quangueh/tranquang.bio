import { Aurora } from "@/components/aurora";
import { Loader } from "@/components/loader";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Stats } from "@/components/sections/stats";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Aurora />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Stats />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
