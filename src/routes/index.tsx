import { createFileRoute } from "@tanstack/react-router";
import { InkLoader } from "@/components/noir/InkLoader";
import { InkCursor } from "@/components/noir/InkCursor";
import { PaperBackground } from "@/components/noir/PaperBackground";
import { NavHint, RadialNav } from "@/components/noir/RadialNav";
import { Hero } from "@/components/noir/sections/Hero";
import { About } from "@/components/noir/sections/About";
import { Services } from "@/components/noir/sections/Services";
import { Skills } from "@/components/noir/sections/Skills";
import { Projects } from "@/components/noir/sections/Projects";
import { Contact } from "@/components/noir/sections/Contact";
import { Footer } from "@/components/noir/sections/Footer";

const title = "Mohamed Abdelnasser — MERN Stack Engineer";
const description =
  "Portfolio of Mohamed Abdelnasser, a MERN stack engineer building scalable web applications with clean architecture, fast interfaces, and considered detail.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="no-native-cursor relative min-h-screen overflow-x-hidden">
      <PaperBackground />
      <InkLoader />
      <InkCursor />
      <RadialNav />
      <NavHint />

      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
