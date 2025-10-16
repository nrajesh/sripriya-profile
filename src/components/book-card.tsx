"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type Book = {
  title: string;
  coverUrl: string;
  detailsUrl: string | null; // Publisher URL
  amazonUrl?: string | null; // New optional field
  flipkartUrl?: string | null; // New optional field
};

interface BookCardProps {
  book: Book;
  priority?: boolean;
}

// Helper component for rendering purchase links
const PurchaseLink = ({ href, label }: { href: string; label: string }) => (
  <Button asChild variant="outline" className="w-full justify-start">
    <a href={href} target="_blank" rel="noopener noreferrer">
      <ExternalLink className="mr-2 h-4 w-4" />
      {label}
    </a>
  </Button>
);

export function BookCard({ book, priority = false }: BookCardProps) {
  // The BookCard is used inside a CarouselItem with the following classes:
  // sm:basis-1/2 (50vw)
  // md:basis-1/3 (33.3vw)
  // lg:basis-1/4 (25vw)
  const imageSizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw";

  return (
    <Dialog>
      <div className="p-1 h-full">
        <Card className="border-2 flex flex-col shadow-none rounded-none h-full">
          <DialogTrigger asChild>
            <CardHeader className="p-0 border-b-2 cursor-pointer">
              <div className="aspect-[2/3] relative block">
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
          </DialogTrigger>
          <CardContent className="p-4 flex-grow flex flex-col">
            <CardTitle className="mb-2 text-lg">{book.title}</CardTitle>
          </CardContent>
        </Card>
      </div>

      <DialogContent className="sm:max-w-[425px] md:max-w-lg p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side: Cover Image */}
          <div className="aspect-[2/3] relative">
            <Image
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right side: Details and Links */}
          <div className="p-6 flex flex-col justify-between">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl">{book.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-3 mt-auto">
              {book.detailsUrl && (
                <PurchaseLink href={book.detailsUrl} label="Buy from Publisher" />
              )}
              {book.amazonUrl && (
                <PurchaseLink href={book.amazonUrl} label="Buy on Amazon" />
              )}
              {book.flipkartUrl && (
                <PurchaseLink href={book.flipkartUrl} label="Buy on Flipkart" />
              )}
              
              {/* Fallback if no links are provided */}
              {!book.detailsUrl && !book.amazonUrl && !book.flipkartUrl && (
                <p className="text-sm text-muted-foreground">Purchase links not available.</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}