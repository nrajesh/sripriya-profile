"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CoverImage, rawCoverImages as initialCoverImagesData } from "@/lib/cover-images";
import { coverImageSchema, CoverImageFormData } from "@/lib/schemas";

const ADMIN_AUTH_KEY = "admin_authenticated";

export default function AdminCoverImagesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [localCoverImages, setLocalCoverImages] = useState<CoverImage[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showJsonOutput, setShowJsonOutput] = useState(false);

  const form = useForm<CoverImageFormData>({
    resolver: zodResolver(coverImageSchema),
    defaultValues: {
      fileName: "",
      url: "",
    },
  });

  useEffect(() => {
    const authStatus = localStorage.getItem(ADMIN_AUTH_KEY);
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setLocalCoverImages(initialCoverImagesData);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
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
        setLocalCoverImages(initialCoverImagesData);
        toast.success("Logged in successfully!");
      } else {
        toast.error("Incorrect password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
    setLocalCoverImages([]);
    toast.info("Logged out.");
  };

  const handleAddImage = (data: CoverImageFormData) => {
    const newImage: CoverImage = {
      id: uuidv4(), // Generate a unique ID for the image
      fileName: data.fileName,
      url: data.url,
    };
    setLocalCoverImages((prev) => [...prev, newImage]);
    setIsAddDialogOpen(false);
    form.reset();
    toast.success("Cover image added successfully!");
  };

  const handleDeleteSelectedImages = () => {
    setLocalCoverImages((prev) =>
      prev.filter((image) => !selectedImageIds.includes(image.id))
    );
    setSelectedImageIds([]);
    setIsDeleteDialogOpen(false);
    toast.success("Selected cover images deleted!");
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImageIds((prev) =>
      prev.includes(id) ? prev.filter((imageId) => imageId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedImageIds.length === localCoverImages.length) {
      setSelectedImageIds([]);
    } else {
      setSelectedImageIds(localCoverImages.map((image) => image.id));
    }
  };

  const openAddDialog = () => {
    form.reset();
    setIsAddDialogOpen(true);
  };

  const jsonOutput = useMemo(() => {
    const sortedImages = [...localCoverImages].sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
    return JSON.stringify(sortedImages, null, 2);
  }, [localCoverImages]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md rounded-lg border p-8 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="mb-8 text-4xl font-bold">Cover Image Management</h1>

      <div className="mb-6 flex justify-between">
        <Button onClick={openAddDialog}>Add New Image</Button>
        <div className="space-x-2">
          {selectedImageIds.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete Selected ({selectedImageIds.length})
            </Button>
          )}
          <Button onClick={() => setShowJsonOutput(!showJsonOutput)} variant="outline">
            {showJsonOutput ? "Hide JSON" : "Show JSON for cover-images.ts"}
          </Button>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </div>
      </div>

      {showJsonOutput && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Updated `rawCoverImages` JSON</h2>
          <p className="text-muted-foreground mb-4">
            Copy the content below and provide it to the AI to update your `src/lib/cover-images.ts` file.
          </p>
          <Textarea
            value={jsonOutput}
            readOnly
            rows={20}
            className="font-mono text-sm bg-muted"
          />
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedImageIds.length === localCoverImages.length && localCoverImages.length > 0}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead className="w-[150px]">Preview</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localCoverImages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                No cover images available.
              </TableCell>
            </TableRow>
          ) : (
            localCoverImages.map((image) => (
              <TableRow key={image.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedImageIds.includes(image.id)}
                    onCheckedChange={() => toggleImageSelection(image.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="relative w-16 h-24 overflow-hidden rounded-md border">
                    <Image
                      src={image.url}
                      alt={image.fileName}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{image.fileName}</TableCell>
                <TableCell>{image.url}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Add Image Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Cover Image</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddImage)} className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="fileName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="my-book-cover.jpg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="/covers/my-book-cover.jpg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Add Image</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected cover images.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSelectedImages}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}