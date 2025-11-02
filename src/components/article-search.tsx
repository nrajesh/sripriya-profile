"use client";

import React, { useState, useEffect } from "react";
import { Command, CommandInput } from "@/components/ui/command";
import { Search } from "lucide-react";

interface ArticleSearchProps {
  onSearch: (searchTerm: string) => void;
  initialSearchTerm: string;
}

export function ArticleSearch({ onSearch, initialSearchTerm }: ArticleSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="relative flex items-center w-full">
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          value={searchTerm}
          onValueChange={setSearchTerm}
          placeholder="Search by article name or link..."
          className="h-10 border-none focus:ring-0"
        />
      </Command>
      <Search className="absolute right-3 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}