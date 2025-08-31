"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { books as allBooks } from "@/lib/data"; // Import all books for suggestions

interface BookSearchProps {
  onSearch: (searchTerm: string) => void;
  onDateFilter: (dateRange: { from?: Date; to?: Date }) => void; // Placeholder for future date filter
}

export function BookSearch({ onSearch, onDateFilter }: BookSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  // Debounce search term to avoid excessive re-renders and filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Notify parent component of the debounced search term
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

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
    <div className="relative w-full max-w-md mx-auto">
      <Command shouldFilter={false}> {/* We handle filtering for suggestions manually */}
        <CommandInput
          placeholder="Search by tags, publisher, or authors..."
          value={searchTerm}
          onValueChange={(value) => {
            setSearchTerm(value);
            setOpen(true); // Open suggestions when typing
          }}
          className="h-10"
        />
        {open && suggestions.length > 0 && (
          <CommandList className="absolute z-20 w-full bg-popover text-popover-foreground shadow-md rounded-md mt-1 max-h-[300px] overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>
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
          </CommandList>
        )}
      </Command>
      {/* Calendar-based search option can be added here */}
    </div>
  );
}