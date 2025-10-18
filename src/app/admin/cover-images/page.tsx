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
import { supabase } from "@/integrations/supabase/client"; // Import Supabase client

const ADMIN_AUTH_KEY = "admin_authenticated";
const SUPABASE_STORAGE_BUCKET = "cover-images"; // Define your Supabase Storage bucket name

export default function AdminCoverImagesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [localCoverImages, setLocalCoverImages] = useState<CoverImage[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showJsonOutput, setShowJsonOutput] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<CoverImageFormData>({
    resolver: zodResolver(coverImageSchema),
    defaultValues: {
      imageFile: undefined, // Initialize as undefined for file input
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

  const handleAddImage = async (data: CoverImageFormData) => {
    const file = data.imageFile;
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    setIsUploading(true);
    const fileId = uuidv4();
    const filePath = `${fileId}-${file.name}`; // Unique path for Supabase storage

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(SUPABASE_STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from(SUPABASE_STORAGE_BUCKET)
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        throw new Error("Could not get public URL for the uploaded file.");
      }

      const newImage: CoverImage = {
        id: fileId,
        fileName: file.name,
        url: publicUrlData.publicUrl,
      };

      setLocalCoverImages((prev) => [...prev, newImage]);
      setIsAddDialogOpen(false);
      form.reset();
      toast.success("Cover image added successfully!");
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast.error(`Failed to upload image: ${error.message || "Unknown error"}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteSelectedImages = async () => {
    if (selectedImageIds.length === 0) return;

    setIsUploading(true); // Use uploading state for deletion too

    try {
      const imagesToDelete = localCoverImages.filter(image => selectedImageIds.includes(image.id));
      const filePathsToDelete = imagesToDelete.map(image => {
        // Extract the path from the URL, assuming the URL structure is consistent
        // e.g., https://<project_id>.supabase.co/storage/v1/object/public/cover-images/uuid-filename.jpg
        const urlParts = image.url.split('/');
        const bucketIndex = urlParts.indexOf(SUPABASE_STORAGE_BUCKET);
        if (bucketIndex > -1 && bucketIndex + 1 < urlParts.length) {
          return urlParts.slice(bucketIndex + 1).join('/');
        }
        return null;
      }).filter(Boolean) as string[]; // Filter out nulls and assert type

      if (filePathsToDelete.length > 0) {
        const { error: deleteError } = await supabase.storage
          .from(SUPABASE_STORAGE_BUCKET)
          .remove(filePathsToDelete);

        if (deleteError) {
          throw deleteError;
        }
      }

      setLocalCoverImages((prev) =>
        prev.filter((image) => !selectedImageIds.includes(image.id))
      );
      setSelectedImageIds([]);
      setIsDeleteDialogOpen(false);
      toast.success("Selected cover images deleted!");
    } catch (error: any) {
      console.error("Error deleting images:", error);
      toast.error(`Failed to delete images: ${error.message || "Unknown error"}`);
    } finally {
      setIsUploading(false);
    }
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
        <Button onClick={openAddDialog} disabled={isUploading}>Add New Image</Button>
        <div className="space-x-2">
          {selectedImageIds.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isUploading}
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
                disabled={isUploading}
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
                    disabled={isUploading}
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
                name="imageFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Image File</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        accept="image/jpeg, image/png, image/gif, image/webp"
                        onChange={(event) => {
                          onChange(event.target.files && event.target.files[0]);
                        }}
                        disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Add Image"}
                </Button>
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
              This action cannot be undone. This will permanently delete the selected cover images from both the list and Supabase Storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUploading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSelectedImages} disabled={isUploading}>
              {isUploading ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}