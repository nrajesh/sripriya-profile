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
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          {author.name}
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-primary mb-8">
          {author.tagline}
        </p>
        <p className="max-w-3xl mx-auto text-muted-foreground mb-8">
          {author.bio}
        </p>
        <Button asChild size="lg">
          <Link href="/books">Explore Books</Link>
        </Button>
      </section>

      {/* Featured Books Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Latest Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <Card key={book.title} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <div className="aspect-[2/3] relative">
                  <Image
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="mb-2">{book.title}</CardTitle>
                <CardDescription className="flex-grow">
                  {book.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}