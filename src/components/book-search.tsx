"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { booksData as allBooks } from "@/lib/books";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookSearchProps {
  onSearch: (searchTerm: string) => void;
  initialSearchTerm: string;
}

export function BookSearch({ onSearch, initialSearchTerm }: BookSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearchTerm);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Generate suggestions based on the debounced search term
  const suggestions = useMemo(() => {
    if (!debouncedSearchTerm) return [];

    const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
    const uniqueSuggestions = new Set<string>();

    allBooks.forEach((book) => {
      // Check tags
      if (book.tags) {
        book.tags.split(",").forEach((tag) => {
          const trimmedTag = tag.trim();
          if (trimmedTag.toLowerCase().includes(lowerCaseSearchTerm)) {
            uniqueSuggestions.add(trimmedTag);
          }
        });
      }
      // Check publisher
      if (book.publisher && book.publisher.toLowerCase().includes(lowerCaseSearchTerm)) {
        uniqueSuggestions.add(book.publisher);
      }
      // Check original authors
      if (book.originalAuthors && book.originalAuthors.toLowerCase().includes(lowerCaseSearchTerm)) {
        uniqueSuggestions.add(book.originalAuthors);
      }
    });

    return Array.from(uniqueSuggestions).sort();
  }, [debouncedSearchTerm]);

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    setOpen(false);
    onSearch(suggestion); // Immediately apply filter when a suggestion is selected
  };

  return (
    <Command ref={containerRef} className="relative overflow-visible">
      <div className={cn("rounded-lg border shadow-md", open ? "ring-2 ring-ring" : "")}>
        <div className="relative flex items-center w-full">
          <CommandInput
            value={searchTerm}
            onValueChange={(value) => {
              setSearchTerm(value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search by tags, publisher, or authors..."
            className="h-10 w-full border-none focus:ring-0"
          />
          <Search className="absolute right-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {open && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-lg outline-none animate-in fade-in-0 zoom-in-95">
          <CommandList>
            {suggestions.length > 0 ? (
              <CommandGroup>
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion}
                    value={suggestion}
                    onSelect={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : debouncedSearchTerm ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : null}
          </CommandList>
        </div>
      )}
    </Command>
  );
}