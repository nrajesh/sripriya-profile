"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Book } from "@/lib/data";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface BookDetailDialogProps {
  book: Book | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  hasNext: boolean;
  hasPrevious: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
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

export function BookDetailDialog({
  book,
  isOpen,
  onOpenChange,
  hasNext,
  hasPrevious,
  goToNext,
  goToPrevious,
}: BookDetailDialogProps) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  if (!book) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === 0 || touchEnd === 0) return;
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > 50; // Minimum distance for a swipe

    if (isSwipe) {
      if (distance > 0) {
        // Swiped left (Next)
        goToNext();
      } else {
        // Swiped right (Previous)
        goToPrevious();
      }
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[425px] md:max-w-2xl p-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Added min-h-[50vh] to ensure consistent vertical space for centering */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] min-h-[50vh] overflow-y-auto">
          
          {/* Left side: Cover Image and Links (Vertically Centered) */}
          <div className="p-6 md:p-8 flex flex-col items-center justify-center border-r h-full">
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

            {/* Purchase Links */}
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
          <div className="p-6 flex flex-col h-full">
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

        {/* Navigation Controls */}
        <div className={cn(
          "absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-2 md:px-4 pointer-events-none",
          // Ensure controls are visible above the dialog content
          "z-[60]" 
        )}>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            disabled={!hasPrevious}
            className={cn(
              "pointer-events-auto bg-background/80 hover:bg-background",
              !hasPrevious && "opacity-0"
            )}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous Book</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            disabled={!hasNext}
            className={cn(
              "pointer-events-auto bg-background/80 hover:bg-background",
              !hasNext && "opacity-0"
            )}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next Book</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}