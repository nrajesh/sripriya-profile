"use client";

import React, { useState, useMemo, useCallback } from "react";
import { books as allBooks, parseDateForSorting } from "@/lib/data";
import { Book } from "@/types/book";

interface DateRange {
  from?: number;
  to?: number;
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
            .some((tag: string) => tag.trim().toLowerCase().includes(searchTerm.toLowerCase())));

      // Filter by date range
      const bookDate = book.publicationDate
        ? parseDateForSorting(book.publicationDate)
        : null;
      const matchesDateRange =
        (!dateRange.from || (bookDate && bookDate >= dateRange.from)) &&
        (!dateRange.to || (bookDate && bookDate <= dateRange.to));

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