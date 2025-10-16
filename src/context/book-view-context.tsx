"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Book } from '@/lib/data';

interface BookViewContextType {
  isOverlayOpen: boolean;
  currentBook: Book | null;
  openOverlay: (book: Book, bookList: Book[]) => void;
  closeOverlay: () => void;
  goToNextBook: () => void;
  goToPreviousBook: () => void;
}

const BookViewContext = createContext<BookViewContextType | undefined>(undefined);

export const useBookView = () => {
  const context = useContext(BookViewContext);
  if (!context) {
    throw new Error('useBookView must be used within a BookViewProvider');
  }
  return context;
};

export const BookViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [bookList, setBookList] = useState<Book[]>([]);

  const openOverlay = useCallback((book: Book, list: Book[]) => {
    setBookList(list);
    setCurrentBook(book);
    setIsOverlayOpen(true);
  }, []);

  const closeOverlay = useCallback(() => {
    setIsOverlayOpen(false);
    setCurrentBook(null);
    // Keep bookList for potential quick re-opening, but clear if needed
  }, []);

  const goToNextBook = useCallback(() => {
    if (!currentBook || bookList.length === 0) return;

    const currentIndex = bookList.findIndex(b => b.id === currentBook.id);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % bookList.length;
    setCurrentBook(bookList[nextIndex]);
  }, [currentBook, bookList]);

  const goToPreviousBook = useCallback(() => {
    if (!currentBook || bookList.length === 0) return;

    const currentIndex = bookList.findIndex(b => b.id === currentBook.id);
    if (currentIndex === -1) return;

    const prevIndex = (currentIndex - 1 + bookList.length) % bookList.length;
    setCurrentBook(bookList[prevIndex]);
  }, [currentBook, bookList]);

  const value = useMemo(() => ({
    isOverlayOpen,
    currentBook,
    openOverlay,
    closeOverlay,
    goToNextBook,
    goToPreviousBook,
  }), [isOverlayOpen, currentBook, openOverlay, closeOverlay, goToNextBook, goToPreviousBook]);

  return (
    <BookViewContext.Provider value={value}>
      {children}
    </BookViewContext.Provider>
  );
};