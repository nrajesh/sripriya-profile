# Sripriya Srinivasan | Official Website

This is the official personal website for author and translator Sripriya Srinivasan. The site is designed to showcase her published works, provide information about her, and serve as a central point of contact.

## ✨ Features

-   **Book Showcase**: Displays a curated list of Sripriya Srinivasan's books, including original publications and translations, on both the home page and a dedicated books page.
-   **Articles & Publications**: A dedicated page lists articles and other publications, with links to the original sources.
-   **Advanced Search & Filtering**: The "Books" page allows users to search by keywords (tags, publisher, authors) and filter by a range of publication years. The "Articles" page features a simple and effective search by title.
-   **Interactive Book Overlay**: Clicking a book opens a detailed view in an overlay, preventing page reloads and providing a seamless browsing experience.
-   **Seamless Navigation**: Users can navigate between books directly from the overlay using arrow keys, on-screen buttons, or touch gestures (swipe left/right) on mobile devices.
-   **Dynamic Theming**: Includes a theme switcher for light and dark modes to ensure a comfortable viewing experience for all users.
-   **Responsive Design**: The layout is fully responsive and optimized for viewing on desktops, tablets, and mobile devices.
-   **SEO and Social Sharing**: Optimized with metadata for search engines and rich previews when shared on social media platforms.
-   **Built with Modern Technologies**: Leverages a modern, performant, and maintainable tech stack.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Fonts**: [Google Fonts](https://fonts.google.com/) (Montserrat)

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

-   `src/app/`: Contains the core application pages and layouts (Home, About, Books, Articles), following the Next.js App Router structure.
-   `src/components/`: Reusable React components used throughout the application (e.g., Header, Footer, UI elements).
-   `src/lib/`: Utility functions and data definitions, such as `data.ts` (for books and author info) and `articles.ts`.
-   `public/`: Static assets, including images (like book covers) and fonts.

## 📚 Managing Content

All the dynamic content for the website (books and articles) is managed through simple data files in the `src/lib/` directory. This makes it easy to update the site without needing to change any of the component code.

### Books

To add, update, or remove a book, edit the `rawBooks` array in `src/lib/data.ts`. Each book is an object with the following properties:

```typescript
{
  id: number; // Unique ID for the book
  title: string;
  coverUrl: string; // Path to the cover image in `public/covers/`
  detailsUrl: string | null; // Link to publisher/details page
  amazonUrl?: string | null;
  flipkartUrl?: string | null;
  originalAuthors: string | null;
  publisher: string | null;
  publicationDate: string | null; // e.g., "June 19, 2025"
  pageCount: string | null;
  isbn: string | null;
  category: string; // e.g., "Original Publication", "Translated Work"
  tags: string | null; // Comma-separated keywords for searching
  description: string;
  isNew?: boolean; // Optional: set to true to display the "NEW" sticker
}
```

**Important:** When adding a new book cover, make sure to place the image file in the `public/covers/` directory.

### Articles

To manage articles, edit the `articlesData` array in `src/lib/articles.ts`. Each article is an object with the following structure:

```typescript
{
  name: string; // The title of the article
  link: string; // The direct URL to the article
  previewImageUrl?: string; // Optional: Path to a preview image in `public/covers/`
  isNew?: boolean; // Optional: set to true to display the "NEW" sticker
}
```

### The "New" Sticker

You can easily mark a book or article as "new" by adding the `isNew: true` property to its data object. This will automatically display a "NEW" sticker on the item's card and in the book detail pop-up. To remove the sticker, simply set `isNew: false` or remove the property entirely.

The sticker system is designed to be robust:
-   It primarily uses an image located at `/public/new-sticker.png`.
-   If this image ever fails to load, a fallback text-based sticker (styled with CSS) will be displayed automatically, ensuring the "new" status is always visible.