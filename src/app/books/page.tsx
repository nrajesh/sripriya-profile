"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Book, books, translations, getMinPublicationYear, getMaxPublicationYear } from "@/lib/data";
import { BookCard } from "@/components/book-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, X } from "lucide-react";

// Combine all books and sort by publication date (newest first)
const ALL_BOOKS: Book[] = [...books, ...translations].sort((a, b) => 
  new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
);

const ALL_CATEGORIES = Array.from(new Set(ALL_BOOKS.map(b => b.category).filter(Boolean) as string[]));
const MIN_YEAR = getMinPublicationYear(ALL_BOOKS);
const MAX_YEAR = getMaxPublicationYear(ALL_BOOKS);

export default function BooksPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [yearRange, setYearRange] = useState<[number, number]>([MIN_YEAR, MAX_YEAR]);

  const filteredBooks = useMemo(() => {
    let filtered = ALL_BOOKS;

    // 1. Filter by Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    // 2. Filter by Search Term
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(lowerCaseSearch) ||
        book.description.toLowerCase().includes(lowerCaseSearch) ||
        book.originalAuthors?.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // 3. Filter by Year Range
    filtered = filtered.filter(book => {
      const year = book.publicationDate ? new Date(book.publicationDate).getFullYear() : MAX_YEAR;
      return year >= yearRange[0] && year <= yearRange[1];
    });

    return filtered;
  }, [selectedCategory, searchTerm, yearRange]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setYearRange([MIN_YEAR, MAX_YEAR]);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">All Works</h1>
      <p className="text-lg text-muted-foreground mb-10 text-center">Explore the complete collection of books and translations.</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4 p-4 border rounded-lg sticky top-20 h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Filter className="w-5 h-5 mr-2" /> Filters
            </h2>
            <Button variant="ghost" size="sm" onClick={handleResetFilters}>
              <X className="w-4 h-4 mr-1" /> Reset
            </Button>
          </div>

          {/* Search Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Search Title/Author</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <Separator />
                {ALL_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-4">
              Publication Year: {yearRange[0]} - {yearRange[1]}
            </label>
            <Slider
              min={MIN_YEAR}
              max={MAX_YEAR}
              step={1}
              value={yearRange}
              onValueChange={(value) => setYearRange(value as [number, number])}
              className="w-[90%] mx-auto"
            />
          </div>
        </aside>

        {/* Book Grid */}
        <main className="lg:w-3/4">
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">{filteredBooks.length} results found</span>
            {selectedCategory !== 'All' && <Badge variant="secondary">{selectedCategory} <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedCategory('All')} /></Badge>}
            {searchTerm && <Badge variant="secondary">Search: {searchTerm} <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSearchTerm('')} /></Badge>}
            {(yearRange[0] !== MIN_YEAR || yearRange[1] !== MAX_YEAR) && <Badge variant="secondary">Year: {yearRange[0]}-{yearRange[1]} <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setYearRange([MIN_YEAR, MAX_YEAR])} /></Badge>}
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div key={book.id} className="relative group">
                  <BookCard book={book} bookList={filteredBooks} /> 
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border rounded-lg bg-muted/50">
              <p className="text-xl text-muted-foreground">No books match your current filters.</p>
              <Button variant="link" onClick={handleResetFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}