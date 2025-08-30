import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { author, books } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute top-0 -left-24 w-72 h-72 bg-secondary rounded-full opacity-20" />
      <div className="absolute -bottom-24 -right-12 w-96 h-96 bg-accent rounded-full opacity-10" />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Hero Section */}
        <section className="text-center md:text-left mb-24 md:mb-32 grid md:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              {author.name}
            </h1>
            <p className="max-w-2xl text-lg text-primary font-semibold mb-6">
              {author.tagline}
            </p>
            <p className="max-w-2xl text-muted-foreground mb-8">
              {author.bio}
            </p>
            <Button asChild size="lg" variant="default">
              <Link href="/books">Explore Books</Link>
            </Button>
          </div>
          <div className="relative h-80 hidden md:block">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-foreground" />
          </div>
        </section>

        {/* Featured Books Section */}
        <section>
          <div className="flex items-center mb-10">
            <h2 className="text-3xl font-bold">Latest Books</h2>
            <div className="flex-grow h-px bg-border ml-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {books.map((book) => (
              <Card
                key={book.title}
                className="border-2 flex flex-col shadow-none rounded-none"
              >
                <CardHeader className="p-0 border-b-2">
                  <div className="aspect-[2/3] relative">
                    <Image
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <CardTitle className="mb-2 text-lg">{book.title}</CardTitle>
                  <CardDescription className="flex-grow text-sm">
                    {book.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}