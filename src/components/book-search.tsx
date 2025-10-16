"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { books as allBooks } from "@/lib/data";
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex items-center w-full">
          <Command className={cn("rounded-lg border shadow-md", open ? "ring-2 ring-ring" : "")}>
            <CommandInput
              value={searchTerm}
              onValueChange={(value) => {
                setSearchTerm(value);
                setOpen(true);
              }}
              placeholder="Search by tags, publisher, or authors..."
              className="h-10 border-none focus:ring-0"
            />
          </Command>
          <Search className="absolute right-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start">
        <Command shouldFilter={false}>
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
  );
}