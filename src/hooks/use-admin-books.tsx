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

  const handleAddBook = useCallback((data: BookFormData) => {
    const newBook = processBookData(data);
    newBook.id = Math.max(...localBooks.map(b => b.id), 0) + 1;
    setLocalBooks((prev) => [...prev, newBook]);
    setIsAddDialogOpen(false);
    form.reset();
    toast.success("Book added successfully!");
  }, [form, localBooks, processBookData]);

  const handleEditBook = useCallback((data: BookFormData) => {
    if (!selectedBook) return;
    const updatedBook = processBookData(data, selectedBook);
    setLocalBooks((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setIsEditDialogOpen(false);
    setSelectedBook(null);
    form.reset();
    toast.success("Book updated successfully!");
  }, [form, selectedBook, processBookData]);

  const handleDeleteSelectedBooks = useCallback(() => {
    setLocalBooks((prev) =>
      prev.filter((book) => !selectedBookIds.includes(book.id))
    );
    setSelectedBookIds([]);
    setIsDeleteDialogOpen(false);
    toast.success("Selected books deleted!");
  }, [selectedBookIds]);

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
  };
}