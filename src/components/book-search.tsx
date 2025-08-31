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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Import Popover components
import { books as allBooks } from "@/lib/data"; // Import all books for suggestions

interface BookSearchProps {
  onSearch: (searchTerm: string) => void;
  onDateFilter: (dateRange: { from?: Date; to?: Date }) => void; // Placeholder for future date filter
}

export function BookSearch({ onSearch, onDateFilter }: BookSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [open, setOpen] = useState(false); // State to control Popover open/close

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
    setOpen(false); // Close popover on selection
    onSearch(suggestion); // Immediately apply filter when a suggestion is selected
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* This is the visible input field */}
          <Input
            placeholder="Search by tags, publisher, or authors..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpen(true); // Open popover when typing
            }}
            onFocus={() => setOpen(true)} // Open popover when input is focused
            className="h-10"
          />
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
          {/* The Command component and its internal CommandInput */}
          <Command shouldFilter={false}> {/* We handle filtering with `suggestions` */}
            {/* This CommandInput is inside the Command context */}
            <CommandInput
              value={searchTerm} // Bind to the same searchTerm state
              onValueChange={(value) => setSearchTerm(value)} // Update searchTerm
              placeholder="Search..." // Placeholder for the internal CommandInput
            />
            <CommandList>
              {suggestions.length === 0 && debouncedSearchTerm ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
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
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* Calendar-based search option can be added here */}
    </div>
  );
}