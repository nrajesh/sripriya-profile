import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://sripriya.in' // Updated domain
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Sripriya Srinivasan | Official Website",
  description: "The official website of author and translator Sripriya Srinivasan.",
  icons: {
    icon: "/author-profile.jpeg", // Using the author profile image as the favicon
  },
  openGraph: {
    title: "Sripriya Srinivasan | Official Website",
    description: "The official website of author and translator Sripriya Srinivasan.",
    images: [
      {
        url: "/author-profile.jpeg",
        width: 400,
        height: 400,
        alt: "Sripriya Srinivasan Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sripriya Srinivasan | Official Website",
    description: "The official website of author and translator Sripriya Srinivasan.",
    images: ["/author-profile.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Changed from "dark" to "light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}