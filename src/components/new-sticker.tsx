"use client";

import Image from "next/image";
import { useState } from "react";

export function NewSticker() {
  const [imageError, setImageError] = useState(false);

  // If the image fails to load, render the fallback text sticker
  if (imageError) {
    return (
      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full z-10 shadow-lg">
        NEW
      </div>
    );
  }

  // Render the image sticker. Positioned to hang off the top-right corner.
  return (
    <div className="absolute -top-3 -right-3 w-20 h-20 z-10 pointer-events-none">
      <Image
        src="/new-sticker.png"
        alt="New book sticker"
        width={80}
        height={80}
        onError={() => setImageError(true)}
        className="object-contain"
      />
    </div>
  );
}