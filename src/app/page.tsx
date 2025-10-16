import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { author, books, translations } from "@/lib/data";
import { BookCard } from "@/components/book-card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  // Display the top 3 books and top 4 translations
  const latestBooks = books.slice(0, 3);
  const latestTranslations = translations.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Author Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 mb-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">
            {author.name}
          </h1>
          <p className="max-w-2xl text-lg text-primary font-semibold mb-6">
            {author.tagline}
          </p>
          <p className="max-w-2xl text-lg text-muted-foreground mb-8">
            {author.bio}
          </p>
          <Link href="/about">
            <Button size="lg" className="group">
              Learn More About Sripriya
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-primary/50">
            <Image
              src={author.profileImage}
              alt={author.name}
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 768px) 256px, 320px"
            />
          </div>
        </div>
      </section>

      {/* Latest Books Section */}
      {latestBooks.length > 0 && (
        <section className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBooks.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/books">
              <Button variant="outline">View All Books</Button>
            </Link>
          </div>
        </section>
      )}

      {/* Latest Translations Section (NEW) */}
      {latestTranslations.length > 0 && (
        <section className="py-12 border-t mt-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Translations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestTranslations.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/books?category=Translation">
              <Button variant="outline">View All Translations</Button>
            </Link>
          </div>
        </section>
      )}

      {/* Placeholder for Blog/News Section */}
      <section className="py-12 border-t mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Read the latest news, articles, and literary insights on the blog.
        </p>
        <Link href="/blog">
          <Button size="lg">Visit Blog</Button>
        </Link>
      </section>
    </div>
  );
}