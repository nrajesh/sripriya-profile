"use client";

import { GeometricBackground } from "@/components/geometric-background";
import { ArticleSearch } from "@/components/article-search";
import { useArticleFilters } from "@/hooks/use-article-filters";
import { ArticleCard } from "@/components/article-card";

export default function ArticlesPage() {
  const { searchTerm, setSearchTerm, filteredArticles } = useArticleFilters();

  return (
    <div className="relative overflow-hidden">
      <GeometricBackground />
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Articles & Publications
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            A collection of writings on various topics.
          </p>
        </header>

        <div className="mb-12 max-w-2xl mx-auto">
          <ArticleSearch onSearch={setSearchTerm} initialSearchTerm={searchTerm} />
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.link} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">
            No articles found matching your search criteria.
          </p>
        )}
      </div>
    </div>
  );
}