export function Contact() {
  return (
    <section id="contact" className="bg-muted/40 py-12 md:py-24">
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Me</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          For inquiries, collaborations, or just to say hello, please feel free to reach out.
        </p>
        <a
          href="mailto:srinivasan.sripriya@gmail.com"
          className="mt-6 inline-block text-lg font-semibold text-primary hover:underline"
        >
          srinivasan.sripriya@gmail.com
        </a>
      </div>
    </section>
  );
}