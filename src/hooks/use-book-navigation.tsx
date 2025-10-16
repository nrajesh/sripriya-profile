"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Book } from "@/lib/data";

interface UseBookNavigationProps {
  books: Book[];
  initialBookId?: number | null;
}

interface UseBookNavigationResult {
  currentBook: Book | null;
  currentIndex: number;
  hasNext: boolean;
  hasPrevious: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  setCurrentBookId: (id: number | null) => void;
}

export function useBookNavigation({ books, initialBookId = null }: UseBookNavigationProps): UseBookNavigationResult {
  const [currentBookId, setCurrentBookId] = useState<number | null>(initialBookId);

  // Find the index of the current book based on its ID
  const currentIndex = React.useMemo(() => {
    if (currentBookId === null) return -1;
    return books.findIndex(book => book.id === currentBookId);
  }, [books, currentBookId]);

  const currentBook = currentIndex !== -1 ? books[currentIndex] : null;
  const hasNext = currentIndex !== -1 && currentIndex < books.length - 1;
  const hasPrevious = currentIndex > 0;

  const goToNext = useCallback(() => {
    if (hasNext) {
      setCurrentBookId(books[currentIndex + 1].id);
    }
  }, [books, currentIndex, hasNext]);

  const goToPrevious = useCallback(() => {
    if (hasPrevious) {
      setCurrentBookId(books[currentIndex - 1].id);
    }
  }, [books, currentIndex, hasPrevious]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    if (currentBookId === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === "ArrowLeft") {
        goToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentBookId, goToNext, goToPrevious]);

  return {
    currentBook,
    currentIndex,
    hasNext,
    hasPrevious,
    goToNext,
    goToPrevious,
    setCurrentBookId,
  };
}