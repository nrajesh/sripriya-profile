"use client";

import React, { useState, useEffect } from "react";
import { Command, CommandInput } from "@/components/ui/command";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  initialSearchTerm: string;
  placeholder: string;
}

export function SearchInput({ onSearch, initialSearchTerm, placeholder }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearchTerm);

  // Update internal searchTerm when initialSearchTerm prop changes (for reset)
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Notify parent component of the debounced search term
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="relative flex items-center w-full">
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          value={searchTerm}
          onValueChange={setSearchTerm}
          placeholder={placeholder}
          className="h-10 border-none focus:ring-0"
        />
      </Command>
      <Search className="absolute right-3 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}