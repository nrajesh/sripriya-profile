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
}

export function BookCard({ book }: BookCardProps) {
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