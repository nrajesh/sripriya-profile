"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAdminBooks } from "@/hooks/use-admin-books";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminBookTable } from "@/components/admin/admin-book-table";
import { BookFormDialog } from "@/components/admin/book-form-dialog";
import { DeleteConfirmationDialog } from "@/components/admin/delete-confirmation-dialog";

export default function AdminBooksPage() {
  const {
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
  } = useAdminBooks();

  if (!isAuthenticated) {
    return (
      <AdminLogin
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="mb-8 text-4xl font-bold">Book Management</h1>

      <div className="mb-6 flex justify-between">
        <Button onClick={openAddDialog}>Add New Book</Button>
        <div className="space-x-2">
          {selectedBookIds.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete Selected ({selectedBookIds.length})
            </Button>
          )}
          <Button onClick={() => setShowJsonOutput(!showJsonOutput)} variant="outline">
            {showJsonOutput ? "Hide JSON" : "Show JSON for data.ts"}
          </Button>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </div>
      </div>

      {showJsonOutput && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Updated `rawBooks` JSON</h2>
          <p className="text-muted-foreground mb-4">
            Copy the content below and provide it to the AI to update your `src/lib/data.ts` file.
          </p>
          <Textarea
            value={jsonOutput}
            readOnly
            rows={20}
            className="font-mono text-sm bg-muted"
          />
        </div>
      )}

      <AdminBookTable
        books={localBooks}
        selectedBookIds={selectedBookIds}
        toggleBookSelection={toggleBookSelection}
        toggleSelectAll={toggleSelectAll}
        onEditBook={openEditDialog}
      />

      <BookFormDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        form={form}
        onSubmit={handleAddBook}
        isEditing={false}
      />

      <BookFormDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        form={form}
        onSubmit={handleEditBook}
        isEditing={true}
        selectedBookTitle={selectedBook?.title}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteSelectedBooks}
        itemCount={selectedBookIds.length}
      />
    </div>
  );
}