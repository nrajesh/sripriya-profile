"use client";

import React, { useState, useMemo, useCallback } from "react";
import { books as allBooks, parseDateForSorting, Book } from "@/lib/data";

interface DateRange {
  from?: Date;
  to?: Date;
}

interface UseBookFiltersResult {
  searchTerm: string;
  dateRange: DateRange;
  filteredBooks: Book[];
  setSearchTerm: (term: string) => void;
  setDateRange: (range: DateRange) => void;
  handleResetFilters: () => void;
}

export function useBookFilters(): UseBookFiltersResult {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({});

  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setDateRange({});
  }, []);

  const filteredBooks = useMemo(() => {
    let currentBooks = allBooks;

    // 1. Apply text search filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentBooks = currentBooks.filter(book => {
        const matchesTags = book.tags?.toLowerCase().includes(lowerCaseSearchTerm);
        const matchesPublisher = book.publisher?.toLowerCase().includes(lowerCaseSearchTerm);
        const matchesAuthors = book.originalAuthors?.toLowerCase().includes(lowerCaseSearchTerm);
        return matchesTags || matchesPublisher || matchesAuthors;
      });
    }

    // 2. Apply date range filter
    if (dateRange.from || dateRange.to) {
      currentBooks = currentBooks.filter(book => {
        const publicationDate = book.publicationDate ? parseDateForSorting(book.publicationDate) : null;
        if (!publicationDate) return false;

        const publicationTime = publicationDate.getTime();
        
        // dateRange.from is already Jan 1st of the selected year
        const fromTime = dateRange.from ? dateRange.from.getTime() : -Infinity;
        
        // dateRange.to is already Dec 31st of the selected year (set in YearRangePicker)
        const toTime = dateRange.to ? dateRange.to.getTime() : Infinity;

        return publicationTime >= fromTime && publicationTime <= toTime;
      });
    }

    return currentBooks;
  }, [searchTerm, dateRange]);

  return {
    searchTerm,
    dateRange,
    filteredBooks,
    setSearchTerm,
    setDateRange,
    handleResetFilters,
  };
}