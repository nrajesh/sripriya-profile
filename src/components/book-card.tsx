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

// Re-import the full Book type from data.ts to ensure all fields are available
import { Book } from "@/lib/data";

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

      <DialogContent className="sm:max-w-[425px] md:max-w-2xl p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          
          {/* Left side: Cover Image and Links (Vertically Centered) */}
          <div className="p-6 md:p-8 flex flex-col items-center justify-center border-r">
            {/* Image Container with Shadow */}
            <div className="aspect-[2/3] relative shadow-xl w-full max-w-xs">
              <Image
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Purchase Links (Moved here) */}
            <div className="space-y-3 mt-6 w-full max-w-xs">
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
                <p className="text-sm text-muted-foreground text-center">Purchase links not available.</p>
              )}
            </div>
          </div>

          {/* Right side: Details (Scrollable) */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl">{book.title}</DialogTitle>
            </DialogHeader>

            {/* Scrollable Content Area */}
            <div className="space-y-3 text-muted-foreground text-sm flex-grow overflow-y-auto pr-2">
              {book.originalAuthors && (
                <p>
                  <span className="font-medium text-foreground">
                    Original Authors:
                  </span>{" "}
                  {book.originalAuthors}
                </p>
              )}
              {book.publisher && (
                <p>
                  <span className="font-medium text-foreground">
                    Publisher:
                  </span>{" "}
                  {book.publisher}
                </p>
              )}
              {book.publicationDate && (
                <p>
                  <span className="font-medium text-foreground">
                    Published:
                  </span>{" "}
                  {book.publicationDate}
                </p>
              )}
              {book.pageCount && (
                <p>
                  <span className="font-medium text-foreground">
                    Pages:
                  </span>{" "}
                  {book.pageCount}
                </p>
              )}
              {book.isbn && (
                <p>
                  <span className="font-medium text-foreground">
                    ISBN/ASIN:
                  </span>{" "}
                  {book.isbn}
                </p>
              )}
              {book.category && (
                <p>
                  <span className="font-medium text-foreground">
                    Category:
                  </span>{" "}
                  {book.category}
                </p>
              )}
              {book.tags && (
                <p>
                  <span className="font-medium text-foreground">
                    Tags:
                  </span>{" "}
                  {book.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .sort()
                    .join(", ")}
                </p>
              )}
              {book.description && (
                <div className="mt-4">
                  <h3 className="font-medium text-foreground mb-1">
                    Description
                  </h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {book.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}