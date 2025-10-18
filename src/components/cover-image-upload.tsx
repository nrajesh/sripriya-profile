"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { UploadCloud, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CoverImageUploadProps {
  value?: string; // Current URL of the cover image
  onChange: (url: string | null) => void; // Callback to update form value
  disabled?: boolean;
}

export function CoverImageUpload({ value, onChange, disabled }: CoverImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPreviewUrl(value || null);
  }, [value]);

  const uploadFile = useCallback(async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-cover', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const { publicUrl } = await response.json();
      setPreviewUrl(publicUrl);
      onChange(publicUrl);
      toast.success("Image uploaded successfully!");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
      onChange(null); // Clear the value on error
    } finally {
      setIsLoading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (disabled || isLoading) return;

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        uploadFile(file);
      } else {
        toast.error("Only image files are allowed.");
      }
    }
  }, [uploadFile, disabled, isLoading]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled || isLoading) return;
    setIsDragging(true);
  }, [disabled, isLoading]);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || isLoading) return;
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        uploadFile(file);
      } else {
        toast.error("Only image files are allowed.");
      }
    }
  }, [uploadFile, disabled, isLoading]);

  const handleRemoveImage = useCallback(() => {
    setPreviewUrl(null);
    onChange(null);
    toast.info("Image removed.");
  }, [onChange]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md transition-colors",
        isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/50",
        disabled && "opacity-50 cursor-not-allowed",
        isLoading && "cursor-wait"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {previewUrl && (
        <>
          <Image
            src={previewUrl}
            alt="Cover Preview"
            fill
            className="object-contain p-2"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-destructive hover:text-destructive-foreground z-10"
            onClick={handleRemoveImage}
            disabled={disabled || isLoading}
          >
            <XCircle className="h-6 w-6" />
            <span className="sr-only">Remove image</span>
          </Button>
        </>
      )}

      {!previewUrl && (
        <div className="flex flex-col items-center text-muted-foreground">
          {isLoading ? (
            <p>Uploading...</p>
          ) : (
            <>
              <UploadCloud className="h-8 w-8 mb-2" />
              <p className="text-sm">Drag & drop an image here, or</p>
              <label htmlFor="file-upload" className="cursor-pointer text-primary hover:underline text-sm mt-1">
                Click to upload
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={disabled || isLoading}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}