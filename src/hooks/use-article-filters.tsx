"use client";

import { useState, useMemo } from "react";
import { articlesData as allArticles, Article } from "@/lib/articles";

interface UseArticleFiltersResult {
  searchTerm: string;
  filteredArticles: Article[];
  setSearchTerm: (term: string) => void;
}

export function useArticleFilters(): UseArticleFiltersResult {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = useMemo(() => {
    if (!searchTerm) {
      return allArticles;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return allArticles.filter(article => {
      const matchesName = article.name.toLowerCase().includes(lowerCaseSearchTerm);
      const matchesLink = article.link.toLowerCase().includes(lowerCaseSearchTerm);
      return matchesName || matchesLink;
    });
  }, [searchTerm]);

  return {
    searchTerm,
    filteredArticles,
    setSearchTerm,
  };
}