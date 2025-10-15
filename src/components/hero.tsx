import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container flex flex-col items-center justify-center py-20 text-center md:py-32">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Sripriya Srinivasan
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Author and Translator, weaving stories between languages and cultures.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="#books">Explore My Books</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="#contact">Get in Touch</Link>
        </Button>
      </div>
    </section>
  );
}