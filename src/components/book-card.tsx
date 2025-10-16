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
import { Book } from "@/lib/data"; // Import Book type from data source

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

      <DialogContent className="sm:max-w-[425px] md:max-w-3xl p-0 max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Left side: Cover Image (1/3 width on desktop) */}
          <div className="aspect-[2/3] relative md:col-span-1">
            <Image
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Right side: Details and Links (2/3 width on desktop) */}
          <div className="p-6 flex flex-col md:col-span-2">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-3xl font-bold">{book.title}</DialogTitle>
              <p className="text-lg text-muted-foreground">by {book.author}</p>
            </DialogHeader>

            {/* Book Description */}
            <div className="mb-6 text-sm text-gray-700 dark:text-gray-300 overflow-y-auto max-h-40">
              <p>{book.description}</p>
            </div>

            {/* Metadata */}
            <div className="space-y-1 text-sm mb-6">
              {book.publicationDate && (
                <p>
                  <span className="font-semibold">Published:</span> {book.publicationDate}
                </p>
              )}
              {book.isbn && (
                <p>
                  <span className="font-semibold">ISBN:</span> {book.isbn}
                </p>
              )}
            </div>

            {/* Purchase Links */}
            <div className="space-y-3 mt-auto pt-4 border-t">
              <h4 className="font-semibold text-lg">Purchase Options</h4>
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