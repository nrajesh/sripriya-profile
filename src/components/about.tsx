import Image from "next/image";

export function About() {
  return (
    <section id="about" className="bg-muted/40 py-12 md:py-24">
      <div className="container grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative h-80 w-full overflow-hidden rounded-lg md:h-96">
           <Image
            src="/author-profile.jpeg"
            alt="Sripriya Srinivasan"
            fill
            className="object-cover object-top"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sripriya Srinivasan is an accomplished author and translator known for her ability to bring stories to life across different languages. With a deep passion for literature, she has worked on a diverse range of projects, from translating the works of prominent figures to crafting her own original publications.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Her work bridges cultural divides, making important narratives accessible to a wider audience.
          </p>
        </div>
      </div>
    </section>
  );
}