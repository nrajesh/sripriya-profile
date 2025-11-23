"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { author, books } from "@/lib/data";
import Link from "next/link";
import { GeometricBackground } from "@/components/geometric-background";
import { HeroArt } from "@/components/hero-art";
import { BookCard } from "@/components/book-card";
import { useBookNavigation } from "@/hooks/use-book-navigation";
import { BookDetailDialog } from "@/components/book-detail-dialog";
import React from "react";

export default function Home() {
  const {
    currentBook,
    hasNext,
    hasPrevious,
    goToNext,
    goToPrevious,
    setCurrentBookId,
  } = useBookNavigation({ books: books });

  const isDialogOpen = currentBook !== null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCurrentBookId(null);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <GeometricBackground />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Hero Section */}
        <section className="text-center md:text-left mb-24 md:mb-32 grid md:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              {author.name}
            </h1>
            <p className="max-w-2xl text-lg text-primary font-semibold mb-6">
              {author.tagline}
            </p>
            <p className="max-w-2xl text-muted-foreground mb-8">
              {author.bio}
            </p>
            <Button asChild size="lg" variant="default">
              <Link href="/books">Explore Books</Link>
            </Button>
          </div>
          <HeroArt />
        </section>

        {/* Featured Books Section */}
        <section>
          <div className="flex items-center mb-10">
            <h2 className="text-3xl font-bold">Latest Books</h2>
            <div className="flex-grow h-px bg-border ml-4"></div>
          </div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="py-4">
              {books.map((book, index) => (
                <CarouselItem
                  key={book.title}
                  className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <BookCard
                    book={book}
                    priority={index === 0}
                    onSelectBook={setCurrentBookId}
                    isNew={book.isNew}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </section>
      </div>

      <BookDetailDialog
        book={currentBook}
        isOpen={isDialogOpen}
        onOpenChange={handleOpenChange}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        goToNext={goToNext}
        goToPrevious={goToPrevious}
      />
    </div>
  );
}