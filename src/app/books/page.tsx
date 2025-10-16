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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

// Helper component for rendering purchase links (replicated from BookCard)
const PurchaseLink = ({ href, label }: { href: string; label: string }) => (
  <Button asChild variant="outline" className="w-full justify-start">
    <a href={href} target="_blank" rel="noopener noreferrer">
      <ExternalLink className="mr-2 h-4 w-4" />
      {label}
    </a>
  </Button>
);

export default function BooksPage() {
  const {
    searchTerm,
    dateRange,
    filteredBooks,
    setSearchTerm,
    setDateRange,
    handleResetFilters,
  } = useBookFilters();

  // Calculate min and max publication years from the data (still memoized)
  const minPublicationYear = useMemo(() => getMinPublicationYear(), []);
  const maxPublicationYear = useMemo(() => getMaxPublicationYear(), []);

  // Group filtered books by category
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

  // Sort categories alphabetically for consistent display
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

        {/* Search Bar and Filters */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
          <div className="w-full md:w-1/2"> {/* BookSearch takes half width on md screens */}
            <BookSearch onSearch={setSearchTerm} initialSearchTerm={searchTerm} />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto"> {/* YearPicker and Reset Button */}
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

        <div className="max-w-4xl mx-auto space-y-12"> {/* Increased space between category groups */}
          {sortedCategories.length === 0 && isFilteringActive ? (
            <p className="text-center text-muted-foreground text-lg">No books found matching your search criteria.</p>
          ) : sortedCategories.length === 0 && !isFilteringActive ? (
            <p className="text-center text-muted-foreground text-lg">No books available.</p>
          ) : null}
          {sortedCategories.map((category) => (
            <div key={category}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
                {category}
              </h2>
              <div className="space-y-8">
                {groupedBooks[category].map((book) => (
                  <Dialog key={book.id}> {/* Each book gets its own dialog */}
                    <DialogTrigger asChild>
                      <Card
                        className="flex flex-col md:flex-row overflow-hidden border-2 shadow-none rounded-none cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <div className="md:w-1/3 flex-shrink-0">
                          <AspectRatio ratio={2 / 3} className="bg-muted">
                            <Image
                              src={book.coverUrl}
                              alt={`Cover of ${book.title}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
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
                          </div>
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
                        </CardContent>
                      </Card>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px] md:max-w-lg p-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
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
                        <div className="p-6 flex flex-col">
                          <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl">{book.title}</DialogTitle>
                          </DialogHeader>

                          <div className="space-y-3 text-muted-foreground text-sm flex-grow">
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

                          <div className="space-y-3 mt-6">
                            {book.detailsUrl && (
                              <PurchaseLink href={book.detailsUrl} label="Buy from Publisher" />
                            )}
                            {book.amazonUrl && (
                              <PurchaseLink href={book.amazonUrl} label="Buy on Amazon" />
                            )}
                            {book.flipkartUrl && (
                              <PurchaseLink href={book.flipkartUrl} label="Buy on Flipkart" />
                            )}
                            
                            {!book.detailsUrl && !book.amazonUrl && !book.flipkartUrl && (
                              <p className="text-sm text-muted-foreground">Purchase links not available.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}