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

Content for the website is managed in two key files:

-   **Books**: To add, update, or remove a book, edit the `rawBooks` array in `src/lib/data.ts`.
-   **Articles**: To manage articles, edit the `articlesData` array in `src/lib/articles.ts`.

Make sure to add any new cover or preview images to the `public/covers/` directory.