import React, { useState, useMemo, useCallback } from "react";
import { books as allBooks, parseDateForSorting, Book } from "@/lib/data";

export type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc";

export const useBookFilters = (initialBooks: Book[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [yearRange, setYearRange] = useState<[number, number] | null>(null);

  const filteredAndSortedBooks = useMemo(() => {
    let currentBooks = initialBooks;
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

    // 1. Filtering
    if (lowerCaseSearchTerm) {
      currentBooks = currentBooks.filter(book => {
        const matchesTitle = book.title.toLowerCase().includes(lowerCaseSearchTerm);
        const matchesDescription = book.description.toLowerCase().includes(lowerCaseSearchTerm);
        
        // Safely check book.author
        const matchesAuthor = book.author && book.author.toLowerCase().includes(lowerCaseSearchTerm);
        
        // Check optional fields
        const matchesTags = book.tags?.toLowerCase().includes(lowerCaseSearchTerm);
        const matchesPublisher = book.publisher?.toLowerCase().includes(lowerCaseSearchTerm);
        const matchesAuthors = book.originalAuthors?.toLowerCase().includes(lowerCaseSearchTerm);

        return matchesTitle || matchesDescription || matchesAuthor || matchesTags || matchesPublisher || matchesAuthors;
      });
    }

    if (yearRange) {
      const [minYear, maxYear] = yearRange;
      currentBooks = currentBooks.filter(book => {
        if (!book.publicationDate) return false;
        const year = new Date(book.publicationDate).getFullYear();
        return year >= minYear && year <= maxYear;
      });
    }

    // 2. Sorting
    return currentBooks.sort((a, b) => {
      switch (sortOption) {
        case "date-desc":
          return parseDateForSorting(b.publicationDate) - parseDateForSorting(a.publicationDate);
        case "date-asc":
          return parseDateForSorting(a.publicationDate) - parseDateForSorting(b.publicationDate);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [initialBooks, searchTerm, sortOption, yearRange]);

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setSortOption("date-desc");
    setYearRange(null);
  }, []);

  return {
    filteredAndSortedBooks,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    yearRange,
    setYearRange,
    resetFilters,
  };
};