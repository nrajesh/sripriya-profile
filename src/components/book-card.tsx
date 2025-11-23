"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "@/lib/data";
import { NewSticker } from "@/components/new-sticker";

interface BookCardProps {
  book: Book;
  priority?: boolean;
  onSelectBook: (id: number) => void;
  isNew?: boolean;
}

export function BookCard({ book, priority = false, onSelectBook, isNew = false }: BookCardProps) {
  const imageSizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw";

  return (
    <div className="p-1 h-full">
      <Card 
        className="border-2 flex flex-col shadow-none rounded-none h-full cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => onSelectBook(book.id)}
      >
        <CardHeader className="p-0 border-b-2">
          <div className="aspect-[2/3] relative block">
            {isNew && <NewSticker />}
            <Image
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
              sizes={imageSizes}
              priority={priority}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="mb-2 text-lg">{book.title}</CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}