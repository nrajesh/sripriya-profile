"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GeometricBackground } from "@/components/geometric-background";
import { SearchInput } from "@/components/search-input";
import React, { useMemo } from "react";
import { YearRangePicker } from "@/components/year-range-picker";
import { Button } from "@/components/ui/button";
import { getMinPublicationYear, getMaxPublicationYear, Book } from "@/lib/data";
import { useBookFilters } from "@/hooks/use-book-filters";
import { useBookNavigation } from "@/hooks/use-book-navigation";
import { BookDetailDialog } from "@/components/book-detail-dialog";
import { NewSticker } from "@/components/new-sticker";
import { BookDetailsContent } from "@/components/book-details-content";

export default function BooksPage() {
  const {
    searchTerm,
    dateRange,
    filteredBooks,
    setSearchTerm,
    setDateRange,
    handleResetFilters,
  } = useBookFilters();

  const {
    currentBook,
    hasNext,
    hasPrevious,
    goToNext,
    goToPrevious,
    setCurrentBookId,
  } = useBookNavigation({ books: filteredBooks });

  const isDialogOpen = currentBook !== null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCurrentBookId(null);
    }
  };

  const minPublicationYear = useMemo(() => getMinPublicationYear(), []);
  const maxPublicationYear = useMemo(() => getMaxPublicationYear(), []);

  const groupedBooks: Record<string, Book[]> = useMemo(() => {
    const groups: Record<string, Book[]> = {};
    filteredBooks.forEach(book => {
      const category = book.category || "Uncategorized";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(book);
    });
    return groups;
  }, [filteredBooks]);

  const sortedCategories = useMemo(() => Object.keys(groupedBooks).sort(), [groupedBooks]);
  const isFilteringActive = searchTerm || dateRange.from || dateRange.to;

  return (
    <div className="relative overflow-hidden">
      <GeometricBackground />
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Published Works
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            A collection of original writings and translations.
          </p>
        </header>

        <p className="text-center text-muted-foreground mb-4 font-semibold">
          Click on an image to see more details.
        </p>

        <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
          <div className="w-full md:w-1/2">
            <SearchInput 
              onSearch={setSearchTerm} 
              initialSearchTerm={searchTerm}
              placeholder="Search by tags, publisher, or authors..."
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <YearRangePicker
              onYearChange={setDateRange}
              initialRange={dateRange}
              className="w-[200px]"
              minYear={minPublicationYear}
              maxYear={maxPublicationYear}
            />
            <Button onClick={handleResetFilters} variant="outline">
              Reset Search
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {sortedCategories.length === 0 && isFilteringActive ? (
            <p className="text-center text-muted-foreground text-lg">No books found matching your search criteria.</p>
          ) : sortedCategories.length === 0 && !isFilteringActive ? (
            <p className="text-center text-muted-foreground text-lg">No books available.</p>
          ) : null}
          {sortedCategories.map((category, categoryIndex) => (
            <div key={category}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
                {category}
              </h2>
              <div className="space-y-8">
                {groupedBooks[category].map((book, bookIndex) => (
                  <div key={book.id}>
                    <Card
                      className="flex flex-col md:flex-row border-2 shadow-none rounded-none cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setCurrentBookId(book.id)}
                    >
                      <div className="md:w-1/3 flex-shrink-0">
                        <AspectRatio ratio={2 / 3} className="bg-muted relative">
                          {book.isNew && <NewSticker />}
                          <Image
                            src={book.coverUrl}
                            alt={`Cover of ${book.title}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={categoryIndex === 0 && bookIndex === 0}
                          />
                        </AspectRatio>
                      </div>
                      <CardContent className="p-6 flex flex-col justify-center md:w-2/3">
                        <h2 className="text-2xl font-bold mb-3">{book.title}</h2>
                        <BookDetailsContent book={book} />
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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