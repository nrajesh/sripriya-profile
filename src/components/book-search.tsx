"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Book } from "@/lib/data";

interface BookSearchProps {
  books: Book[];
  onSearch: (term: string) => void;
  currentSearchTerm: string;
}

export function BookSearch({ books, onSearch, currentSearchTerm }: BookSearchProps) {
  const [inputValue, setInputValue] = useState(currentSearchTerm);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setInputValue(currentSearchTerm);
  }, [currentSearchTerm]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
    setIsOpen(value.length > 0);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
    setIsOpen(false);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    onSearch(suggestion);
    setIsOpen(false);
  };

  const uniqueSuggestions = useMemo(() => {
    if (inputValue.length < 2) return [];

    const lowerCaseSearchTerm = inputValue.toLowerCase().trim();
    const uniqueSuggestions = new Set<string>();

    books.forEach((book) => {
      // Check title
      if (book.title.toLowerCase().includes(lowerCaseSearchTerm)) {
        uniqueSuggestions.add(book.title);
      }

      // Check tags
      if (book.tags) {
        book.tags.split(",").forEach((tag: string) => {
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

    return Array.from(uniqueSuggestions).slice(0, 5);
  }, [books, inputValue]);

  const showSuggestions = isOpen && uniqueSuggestions.length > 0;

  return (
    <div className="relative w-full max-w-md">
      <Command shouldFilter={false} className="overflow-visible bg-transparent">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <CommandInput
            value={inputValue}
            onValueChange={setInputValue} // Keep CommandInput happy, but use custom handler for full control
            onChange={handleInputChange}
            placeholder="Search by title, tag, or publisher..."
            className="pl-10 pr-10 h-10"
            onFocus={() => setIsOpen(inputValue.length > 0)}
            onBlur={() => {
              // Delay closing to allow click on suggestion
              setTimeout(() => setIsOpen(false), 150);
            }}
          />
          {inputValue && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-1 h-8 w-8"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {(showSuggestions || isMobile) && (
          <div
            className={`absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md transition-opacity duration-100 ${
              showSuggestions ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
          >
            <CommandList>
              {showSuggestions ? (
                <CommandGroup heading="Suggestions">
                  {uniqueSuggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion}
                      value={suggestion}
                      onSelect={() => handleSelectSuggestion(suggestion)}
                      className="cursor-pointer"
                    >
                      {suggestion}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                // Render empty state to stabilize DOM structure on mobile
                <CommandEmpty>No suggestions found.</CommandEmpty>
              )}
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}