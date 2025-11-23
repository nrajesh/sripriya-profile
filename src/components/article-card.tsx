import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Article } from "@/lib/articles";
import { Link as LinkIcon } from "lucide-react";
<<<<<<< HEAD
import { NewSticker } from "./new-sticker";

interface ArticleCardProps {
  article: Article;
  isNew?: boolean;
}

export function ArticleCard({ article, isNew = false }: ArticleCardProps) {
=======

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
>>>>>>> origin/main
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group"
    >
      <Card className="border-2 flex flex-col shadow-none rounded-none h-full transition-colors group-hover:bg-muted/50">
        <CardHeader className="p-0 border-b-2">
<<<<<<< HEAD
          <AspectRatio ratio={16 / 9} className="bg-muted relative">
            {isNew && <NewSticker />}
=======
          <AspectRatio ratio={16 / 9} className="bg-muted">
>>>>>>> origin/main
            {article.previewImageUrl ? (
              <Image
                src={article.previewImageUrl}
                alt={`Preview for ${article.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <LinkIcon className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="mb-2 text-lg">{article.name}</CardTitle>
        </CardContent>
      </Card>
    </a>
  );
}