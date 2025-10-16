"use client";

import React, { useMemo, useState } from "react";
import { BookCard } from "@/components/book-card";
import { BookSearch } from "@/components/book-search";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getMinPublicationYear, getMaxPublicationYear, Book } from "@/lib/data";
import { useBookFilters } from "@/hooks/use-book-filters";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, Filter, RotateCcw } from "lucide-react";

// Assuming allBooks is passed down or fetched here. For now, we use the hook's internal data.
// Since this is a client component, we rely on the hook to manage the data source.

export default function BooksPage() {
  const {
    filteredAndSortedBooks,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    yearRange,
    setYearRange,
    resetFilters,
  } = useBookFilters([]); // Initial books are handled inside the hook for simplicity

  const allBooks = useBookFilters([]).filteredAndSortedBooks; // Temporary access to all books for year calculation
  const minYear = useMemo(() => getMinPublicationYear(allBooks), [allBooks]);
  const maxYear = useMemo(() => getMaxPublicationYear(allBooks), [allBooks]);
  const initialYearRange: [number, number] = [minYear, maxYear];

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const groupedBooks = useMemo(() => {
    const groups: { [key: string]: Book[] } = {};
    filteredAndSortedBooks.forEach(book => {
      const category = book.category || "Uncategorized";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(book);
    });
    return groups;
  }, [filteredAndSortedBooks]);

  const sortOptions = [
    { value: "date-desc", label: "Newest First", icon: ArrowDown },
    { value: "date-asc", label: "Oldest First", icon: ArrowUp },
    { value: "title-asc", label: "Title (A-Z)", icon: ArrowUp },
    { value: "title-desc", label: "Title (Z-A)", icon: ArrowDown },
  ];

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Books & Translations</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <BookSearch
          books={allBooks}
          onSearch={setSearchTerm}
          currentSearchTerm={searchTerm}
        />
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="md:hidden"
        >
          <Filter className="h-4 w-4 mr-2" />
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filters Panel */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isFilterOpen ? "max-h-96 opacity-100 mb-8" : "max-h-0 opacity-0 md:max-h-96 md:opacity-100 md:mb-8"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-lg bg-muted/20">
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <Select
              value={sortOption}
              onValueChange={(value) => setSortOption(value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sort order" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <option.icon className="h-4 w-4 mr-2" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Range Filter */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Publication Year: {yearRange ? `${yearRange[0]} - ${yearRange[1]}` : `${minYear} - ${maxYear}`}
            </label>
            <Slider
              min={minYear}
              max={maxYear}
              step={1}
              value={yearRange || initialYearRange}
              onValueChange={(value) => setYearRange(value as [number, number])}
              className="w-full"
            />
          </div>

          {/* Reset Button */}
          <div className="md:col-start-3 flex justify-end">
            <Button variant="ghost" onClick={resetFilters}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Book Listings */}
      {Object.keys(groupedBooks).length === 0 ? (
        <p className="text-center text-lg text-muted-foreground mt-12">
          No books found matching your criteria.
        </p>
      ) : (
        Object.entries(groupedBooks).map(([category, books]) => (
          <section key={category} className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <div key={book.title} className="relative group">
                  <BookCard book={book} />
                  
                  {/* Hover Overlay for Quick Details */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-white cursor-pointer"
                       onClick={() => { /* Dialog is handled by BookCard trigger */ }}>
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                      <p className="text-sm mb-4">{book.author}</p>
                      
                      <div className="space-y-1 text-muted-foreground">
                        {book.originalAuthors && (
                          <p>
                            <span className="font-semibold text-white">Original Author:</span>{" "}
                            {book.originalAuthors}
                          </p>
                        )}
                        {book.publisher && (
                          <p>
                            <span className="font-semibold text-white">Publisher:</span>{" "}
                            {book.publisher}
                          </p>
                        )}
                        {book.publicationDate && (
                          <p>
                            <span className="font-semibold text-white">Published:</span>{" "}
                            {book.publicationDate}
                          </p>
                        )}
                        {book.pageCount && (
                          <p>
                            <span className="font-semibold text-white">Pages:</span>{" "}
                            {book.pageCount}
                          </p>
                        )}
                        {book.category && (
                          <p>
                            <span className="font-semibold text-white">Category:</span>{" "}
                            {book.category}
                          </p>
                        )}
                        {book.tags && (
                          <p>
                            <span className="font-semibold text-white">Tags:</span>{" "}
                            {book.tags
                              .split(",")
                              .map((tag: string) => tag.trim())
                              .sort()
                              .join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="mt-12" />
          </section>
        ))
      )}
    </div>
  );
}