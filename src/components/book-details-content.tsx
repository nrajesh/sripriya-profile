import { Book } from "@/lib/data";

interface BookDetailsContentProps {
  book: Book;
}

export function BookDetailsContent({ book }: BookDetailsContentProps) {
  return (
    <>
      <div className="space-y-1 text-muted-foreground text-sm">
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
          <p className="text-muted-foreground whitespace-pre-line text-sm">
            {book.description}
          </p>
        </div>
      )}
    </>
  );
}