"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBookView } from "../context/book-view-context";
import { Badge } from "@/components/ui/badge";

export function BookOverlay() {
  const { 
    isOverlayOpen, 
    currentBook, 
    closeOverlay, 
    goToNextBook, 
    goToPreviousBook 
  } = useBookView();
  
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation (Arrow keys)
  useEffect(() => {
    if (!isOverlayOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToNextBook();
      } else if (event.key === "ArrowLeft") {
        goToPreviousBook();
      } else if (event.key === "Escape") {
        closeOverlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOverlayOpen, goToNextBook, goToPreviousBook, closeOverlay]);

  if (!currentBook) return null;

  const { 
    title, 
    coverUrl, 
    description, 
    author, 
    publicationDate, 
    publisher, 
    isbn, 
    tags, 
    originalAuthors,
    buyLink 
  } = currentBook;

  const year = publicationDate ? new Date(publicationDate).getFullYear() : "N/A";

  return (
    <Dialog open={isOverlayOpen} onOpenChange={closeOverlay}>
      <DialogContent 
        className="max-w-4xl p-0 overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[70vh]"
        ref={dialogRef}
      >
        {/* Accessibility Title */}
        <DialogTitle className="sr-only">{`Details for book: ${title}`}</DialogTitle>

        {/* Navigation Buttons (Visible on desktop) */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex bg-background/50 hover:bg-background/80"
          onClick={goToPreviousBook}
          aria-label="Previous Book"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex bg-background/50 hover:bg-background/80"
          onClick={goToNextBook}
          aria-label="Next Book"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Close Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-20"
          onClick={closeOverlay}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Left Side: Cover Image */}
        <div className="relative w-full md:w-1/3 flex-shrink-0 bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center">
          <div className="aspect-[2/3] w-48 md:w-full max-w-xs relative shadow-2xl">
            <Image
              src={coverUrl}
              alt={`Cover of ${title}`}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              sizes="(max-width: 768px) 192px, 33vw"
            />
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-lg text-primary mb-4">
            {author}
            {originalAuthors && <span className="text-muted-foreground block text-sm mt-1">Original Author: {originalAuthors}</span>}
          </p>

          <div className="space-y-4 text-sm text-muted-foreground mb-6">
            <p><strong>Published:</strong> {publisher} ({year})</p>
            {isbn && <p><strong>ISBN:</strong> {isbn}</p>}
            {tags && (
              <div className="flex flex-wrap gap-2">
                {tags.split(',').map((tag: string, i: number) => (
                  <Badge key={i} variant="secondary">{tag.trim()}</Badge>
                ))}
              </div>
            )}
          </div>

          <div className="text-base text-foreground leading-relaxed mb-8 whitespace-pre-wrap">
            {description}
          </div>

          {buyLink && (
            <a href={buyLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full md:w-auto group">
                <BookOpen className="mr-2 h-4 w-4" />
                Buy Now
              </Button>
            </a>
          )}
          
          {/* Mobile Navigation (Visible on mobile) */}
          <div className="flex justify-between mt-6 md:hidden">
            <Button variant="outline" onClick={goToPreviousBook}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <Button variant="outline" onClick={goToNextBook}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}