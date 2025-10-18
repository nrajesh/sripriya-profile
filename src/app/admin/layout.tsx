import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <nav className="flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link href="/admin/books">Manage Books</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/admin/cover-images">Manage Cover Images</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}