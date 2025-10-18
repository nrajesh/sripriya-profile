"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GeometricBackground } from "@/components/geometric-background";
import { BookSearch } from "@/components/book-search";
import React, { useMemo } from "react";
import { YearRangePicker } from "@/components/year-range-picker";
import { Button } from "@/components/ui/button";
import { getMinPublicationYear, getMaxPublicationYear, Book } from "@/lib/data";
import { useBookFilters } from "@/hooks/use-book-filters";
import { useBookNavigation } from "@/hooks/use-book-navigation";
import { BookDetailDialog } from "@/components/book-detail-dialog";

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

        <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
          <div className="w-full md:w-1/2">
            <BookSearch onSearch={setSearchTerm} initialSearchTerm={searchTerm} />
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
                      className="flex flex-col md:flex-row overflow-hidden border-2 shadow-none rounded-none cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setCurrentBookId(book.id)}
                    >
                      <div className="md:w-1/3 flex-shrink-0">
                        <AspectRatio ratio={2 / 3} className="bg-muted">
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
                        <div className="space-y-1 text-muted-foreground">
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