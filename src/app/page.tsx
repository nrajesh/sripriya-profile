import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Books } from "@/components/books";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Books />
      <Contact />
    </>
  );
}