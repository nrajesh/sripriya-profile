"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book } from "@/lib/data";

interface AdminBookTableProps {
  books: Book[];
  selectedBookIds: number[];
  toggleBookSelection: (id: number) => void;
  toggleSelectAll: () => void;
  onEditBook: (book: Book) => void;
}

export function AdminBookTable({
  books,
  selectedBookIds,
  toggleBookSelection,
  toggleSelectAll,
  onEditBook,
}: AdminBookTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox
              checked={selectedBookIds.length === books.length && books.length > 0}
              onCheckedChange={toggleSelectAll}
            />
          </TableHead>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Publisher</TableHead>
          <TableHead className="w-[100px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
              No books available.
            </TableCell>
          </TableRow>
        ) : (
          books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>
                <Checkbox
                  checked={selectedBookIds.includes(book.id)}
                  onCheckedChange={() => toggleBookSelection(book.id)}
                />
              </TableCell>
              <TableCell>{book.id}</TableCell>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.publisher || "N/A"}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => onEditBook(book)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}