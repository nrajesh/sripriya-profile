import Image from "next/image";
import { books } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ConditionalLink } from "@/components/conditional-link";
import { GeometricBackground } from "@/components/geometric-background";

export default function BooksPage() {
  // Group books by category
  const groupedBooks: Record<string, typeof books[0][]> = {};
  books.forEach(book => {
    const category = book.category || "Uncategorized"; // Default category if not specified
    if (!groupedBooks[category]) {
      groupedBooks[category] = [];
    }
    groupedBooks[category].push(book);
  });

  // Sort categories alphabetically for consistent display
  const sortedCategories = Object.keys(groupedBooks).sort();

  return (
    <div className="relative overflow-hidden">
      <GeometricBackground />
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Published Works
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            A collection of original writings and translations.
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-12"> {/* Increased space between category groups */}
          {sortedCategories.map((category) => (
            <div key={category}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
                {category}
              </h2>
              <div className="space-y-8">
                {groupedBooks[category].map((book) => (
                  <Card
                    key={book.title}
                    className="flex flex-col md:flex-row overflow-hidden border-2 shadow-none rounded-none"
                  >
                    <div className="md:w-1/3 flex-shrink-0">
                      <ConditionalLink href={book.detailsUrl}>
                        <AspectRatio ratio={2 / 3} className="bg-muted">
                          <Image
                            src={book.coverUrl}
                            alt={`Cover of ${book.title}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </AspectRatio>
                      </ConditionalLink>
                    </div>
                    <CardContent className="p-6 flex flex-col justify-center md:w-2/3">
                      <h2 className="text-2xl font-bold mb-3">{book.title}</h2>
                      <div className="space-y-1 text-muted-foreground">
                        {book.originalAuthors && (
                          <p>
                            <span className="font-medium text-foreground">
                              Original Authors:
                            </span>{" "}
                            {book.originalAuthors}
                          </p>
                        )}
                        {book.publisher && (
                          <p>
                            <span className="font-medium text-foreground">
                              Publisher:
                            </span>{" "}
                            {book.publisher}
                          </p>
                        )}
                        {book.publicationDate && (
                          <p>
                            <span className="font-medium text-foreground">
                              Published:
                            </span>{" "}
                            {book.publicationDate}
                          </p>
                        )}
                        {book.pageCount && (
                          <p>
                            <span className="font-medium text-foreground">
                              Pages:
                            </span>{" "}
                            {book.pageCount}
                          </p>
                        )}
                        {book.isbn && (
                          <p>
                            <span className="font-medium text-foreground">
                              ISBN/ASIN:
                            </span>{" "}
                            {book.isbn}
                          </p>
                        )}
                        {book.category && (
                          <p>
                            <span className="font-medium text-foreground">
                              Category:
                            </span>{" "}
                            {book.category}
                          </p>
                        )}
                        {book.tags && (
                          <p>
                            <span className="font-medium text-foreground">
                              Tags:
                            </span>{" "}
                            {book.tags
                              .split(",")
                              .map((tag) => tag.trim())
                              .sort()
                              .join(", ")}
                          </p>
                        )}
                      </div>
                      {book.description && (
                        <div className="mt-4">
                          <h3 className="font-medium text-foreground mb-1">
                            Description
                          </h3>
                          <p className="text-muted-foreground whitespace-pre-line">
                            {book.description}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}