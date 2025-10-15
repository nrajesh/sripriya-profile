import Image from "next/image";
import Link from "next/link";
import { booksData } from "@/lib/books";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Books() {
  return (
    <section id="books" className="container py-12 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          My Books
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A collection of my original works and translations.
        </p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {booksData.map((book, index) => (
          <Card key={book.id} className="flex flex-col">
            <CardHeader>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <CardTitle>{book.title}</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                {book.category}
              </p>
            </CardContent>
            <CardFooter>
              {book.detailsUrl ? (
                <Button asChild className="w-full">
                  <Link
                    href={book.detailsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                  </Link>
                </Button>
              ) : (
                <Button disabled className="w-full">
                  Not Available Online
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}