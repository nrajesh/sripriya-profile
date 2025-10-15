import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConditionalLink } from "@/components/conditional-link";

type Book = {
  title: string;
  coverUrl: string;
  detailsUrl: string | null;
};

interface BookCardProps {
  book: Book;
  priority?: boolean; // Added priority prop
}

export function BookCard({ book, priority = false }: BookCardProps) {
  // The BookCard is used inside a CarouselItem with the following classes:
  // sm:basis-1/2 (50vw)
  // md:basis-1/3 (33.3vw)
  // lg:basis-1/4 (25vw)
  const imageSizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw";

  return (
    <div className="p-1 h-full">
      <Card className="border-2 flex flex-col shadow-none rounded-none h-full">
        <CardHeader className="p-0 border-b-2">
          <ConditionalLink
            href={book.detailsUrl}
            className="aspect-[2/3] relative block"
          >
            <Image
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
              sizes={imageSizes}
              priority={priority} // Pass priority here
            />
          </ConditionalLink>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="mb-2 text-lg">{book.title}</CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}