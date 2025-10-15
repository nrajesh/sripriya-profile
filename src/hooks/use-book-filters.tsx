"use client";

import React, { useState, useMemo, useCallback } from "react";
import { books as allBooks, parseDateForSorting } from "@/lib/data";
import { Book } from "@/types/book"; // Fix Error 4: Import Book from types

interface DateRange {
  from?: number; // Timestamp (number)
  to?: number; // Timestamp (number)
}

export function useBookFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({});

  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      // Filter by search term
      const matchesSearch =
        !searchTerm ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.originalAuthors &&
          book.originalAuthors.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (book.description &&
          book.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (book.tags &&
          book.tags
            .split(",")
            .some((tag: string) => tag.trim().toLowerCase().includes(searchTerm.toLowerCase()))); // Fix implicit 'any'

      // Filter by date range
      const bookDateTimestamp = book.publicationDate
        ? parseDateForSorting(book.publicationDate) // parseDateForSorting returns a number (timestamp)
        : null;
        
      // Fix Error 5: bookDateTimestamp is already a number (timestamp), no need to call .getTime()
      const matchesDateRange =
        (!dateRange.from || (bookDateTimestamp && bookDateTimestamp >= dateRange.from)) &&
        (!dateRange.to || (bookDateTimestamp && bookDateTimestamp <= dateRange.to));

      return matchesSearch && matchesDateRange;
    });
  }, [searchTerm, dateRange]);

  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setDateRange({});
  }, []);

  return {
    searchTerm,
    dateRange,
    filteredBooks,
    setSearchTerm,
    setDateRange,
    handleResetFilters,
  };
}