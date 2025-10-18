"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

import { Book, books as initialBooksData, DEFAULT_COVER_IMAGE_URL } from "@/lib/data";
import { bookSchema, BookFormData } from "@/lib/schemas";

const ADMIN_AUTH_KEY = "admin_authenticated";

export function useAdminBooks() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedBookIds, setSelectedBookIds] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showJsonOutput, setShowJsonOutput] = useState(false);

  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      coverUrl: DEFAULT_COVER_IMAGE_URL,
      detailsUrl: "",
      amazonUrl: "",
      flipkartUrl: "",
      originalAuthors: "",
      publisher: "",
      publicationDate: "",
      pageCount: "",
      isbn: "",
      category: "",
      tags: "",
      description: "",
    },
  });

  useEffect(() => {
    const authStatus = localStorage.getItem(ADMIN_AUTH_KEY);
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setLocalBooks(initialBooksData);
    }
  }, []);

  const saveBooksToDataFile = useCallback(async (updatedBooks: Book[]) => {
    try {
      const response = await fetch("/api/update-books-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: passwordInput, // Sending password for basic API route authentication
          booksData: updatedBooks.sort((a, b) => a.id - b.id), // Ensure consistent order
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save data to file');
      }
      toast.success("Books data saved to file. Please restart the app to see changes.");
    } catch (error: any) {
      console.error("Error saving books data to file:", error);
      toast.error(`Failed to save data to file: ${error.message}`);
    }
  }, [passwordInput]); // Depend on passwordInput for API call

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: passwordInput }),
      });

      if (response.ok) {
        localStorage.setItem(ADMIN_AUTH_KEY, "true");
        setIsAuthenticated(true);
        setLocalBooks(initialBooksData);
        toast.success("Logged in successfully!");
      } else {
        toast.error("Incorrect password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  }, [passwordInput]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
    setLocalBooks([]);
    toast.info("Logged out.");
  }, []);

  const processBookData = useCallback((data: BookFormData, existingBook?: Book): Book => {
    const category = data.originalAuthors && data.originalAuthors.trim() !== ""
      ? "Translated Work"
      : "Original Publication";

    const coverUrl = data.coverUrl && data.coverUrl.trim() !== ""
      ? data.coverUrl
      : DEFAULT_COVER_IMAGE_URL;

    return {
      ...existingBook,
      ...data,
      coverUrl,
      detailsUrl: data.detailsUrl || null,
      amazonUrl: data.amazonUrl || null,
      flipkartUrl: data.flipkartUrl || null,
      originalAuthors: data.originalAuthors || null,
      publisher: data.publisher || null,
      publicationDate: data.publicationDate || null,
      pageCount: data.pageCount || null,
      isbn: data.isbn || null,
      category,
      tags: data.tags,
      description: data.description,
    } as Book;
  }, []);

  const handleAddBook = useCallback(async (data: BookFormData) => {
    const newBook = processBookData(data);
    newBook.id = Math.max(...localBooks.map(b => b.id), 0) + 1;
    const updatedBooks = [...localBooks, newBook];
    setLocalBooks(updatedBooks);
    setIsAddDialogOpen(false);
    form.reset();
    toast.success("Book added successfully!");
    await saveBooksToDataFile(updatedBooks);
  }, [form, localBooks, processBookData, saveBooksToDataFile]);

  const handleEditBook = useCallback(async (data: BookFormData) => {
    if (!selectedBook) return;
    const updatedBook = processBookData(data, selectedBook);
    const updatedBooks = localBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book));
    setLocalBooks(updatedBooks);
    setIsEditDialogOpen(false);
    setSelectedBook(null);
    form.reset();
    toast.success("Book updated successfully!");
    await saveBooksToDataFile(updatedBooks);
  }, [form, localBooks, selectedBook, processBookData, saveBooksToDataFile]);

  const handleDeleteSelectedBooks = useCallback(async () => {
    const updatedBooks = localBooks.filter((book) => !selectedBookIds.includes(book.id));
    setLocalBooks(updatedBooks);
    setSelectedBookIds([]);
    setIsDeleteDialogOpen(false);
    toast.success("Selected books deleted!");
    await saveBooksToDataFile(updatedBooks);
  }, [localBooks, selectedBookIds, saveBooksToDataFile]);

  const toggleBookSelection = useCallback((id: number) => {
    setSelectedBookIds((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedBookIds.length === localBooks.length) {
      setSelectedBookIds([]);
    } else {
      setSelectedBookIds(localBooks.map((book) => book.id));
    }
  }, [localBooks, selectedBookIds.length]);

  const openAddDialog = useCallback(() => {
    form.reset({
      title: "",
      coverUrl: DEFAULT_COVER_IMAGE_URL,
      detailsUrl: "",
      amazonUrl: "",
      flipkartUrl: "",
      originalAuthors: "",
      publisher: "",
      publicationDate: "",
      pageCount: "",
      isbn: "",
      category: "",
      tags: "",
      description: "",
    });
    setIsAddDialogOpen(true);
  }, [form]);

  const openEditDialog = useCallback((book: Book) => {
    setSelectedBook(book);
    form.reset({
      title: book.title,
      coverUrl: book.coverUrl,
      detailsUrl: book.detailsUrl || "",
      amazonUrl: book.amazonUrl || "",
      flipkartUrl: book.flipkartUrl || "",
      originalAuthors: book.originalAuthors || "",
      publisher: book.publisher || "",
      publicationDate: book.publicationDate || "",
      pageCount: book.pageCount || "",
      isbn: book.isbn || "",
      category: book.category,
      tags: book.tags,
      description: book.description,
    });
    setIsEditDialogOpen(true);
  }, [form]);

  const handleRestartApp = useCallback(() => {
    toast.info("Please click the 'Restart' button above the chat input to apply changes.");
    // We don't actually restart the server from here, but prompt the user.
  }, []);

  const jsonOutput = useMemo(() => {
    const sortedBooks = [...localBooks].sort((a, b) => a.id - b.id);
    return JSON.stringify(sortedBooks, null, 2);
  }, [localBooks]);

  return {
    isAuthenticated,
    passwordInput,
    setPasswordInput,
    handleLogin,
    handleLogout,
    localBooks,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedBook,
    openAddDialog,
    openEditDialog,
    selectedBookIds,
    toggleBookSelection,
    toggleSelectAll,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteSelectedBooks,
    showJsonOutput,
    setShowJsonOutput,
    jsonOutput,
    form,
    handleAddBook,
    handleEditBook,
    handleRestartApp,
  };
}