"use client";

import React from "react";
import Image from "next/image";
import { Book, books, translations } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookView } from "../context/book-view-context";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { openOverlay } = useBookView();

  const handleCardClick = () => {
    // Determine the correct list based on the book's category or presence in global lists
    let listToUse: Book[] = [];
    
    // Simple heuristic: if the book is a translation, use the translations list. Otherwise, use the main books list.
    // This is a simplification; a more robust solution would pass the list from the parent component.
    // Since the home page uses separate lists, we check which list contains the book.
    if (translations.some(t => t.id === book.id)) {
        listToUse = translations;
    } else if (books.some(b => b.id === book.id)) {
        listToUse = books;
    }
    
    // Fallback to the main books list if context is unclear
    if (listToUse.length === 0) {
        listToUse = books;
    }

    openOverlay(book, listToUse);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0 relative">
        <div className="aspect-[2/3] relative block">
          <Image
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold line-clamp-2 mb-1">
          {book.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {book.author}
        </p>
      </CardContent>
    </Card>
  );
}