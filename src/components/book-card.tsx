"use client";

import React from "react";
import Image from "next/image";
import { Book } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookView } from "../context/book-view-context";

interface BookCardProps {
  book: Book;
  bookList: Book[]; // New required prop
}

export function BookCard({ book, bookList }: BookCardProps) {
  const { openOverlay } = useBookView();

  const handleCardClick = () => {
    // Pass the specific list provided by the parent component (Home page section)
    openOverlay(book, bookList);
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