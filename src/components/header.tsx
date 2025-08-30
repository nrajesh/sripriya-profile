"use client";

import Link from "next/link";
import { Menu, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navLinks } from "@/lib/data";
import { useState, useEffect } from "react";

export function Header() {
  const [selectedGradient, setSelectedGradient] = useState<string>("");

  useEffect(() => {
    const storedGradient = localStorage.getItem("header-gradient");
    if (storedGradient) {
      setSelectedGradient(storedGradient);
    }
  }, []);

  const gradients = [
    { name: "Blue-Orange", class: "bg-gradient-to-r from-blue-400 to-orange-400" },
    { name: "Purple-Pink", class: "bg-gradient-to-r from-purple-400 to-pink-400" },
    { name: "Green-Teal", class: "bg-gradient-to-r from-green-400 to-teal-400" },
    { name: "None", class: "" }, // Option to remove gradient
  ];

  const handleGradientChange = (gradientClass: string) => {
    setSelectedGradient(gradientClass);
    localStorage.setItem("header-gradient", gradientClass);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background ${selectedGradient}`}>
      <div className="container relative flex h-14 items-center justify-end">
        {/* Desktop navigation in the center */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right-aligned items: Mobile trigger and Gradient switcher */}
        <div className="flex items-center">
          {/* Mobile navigation trigger (only visible on mobile) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="rounded-none">
                <div className="flex flex-col gap-6 pt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-foreground/80"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Gradient switcher (visible on all screen sizes) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Palette className="h-5 w-5" />
                <span className="sr-only">Choose Header Gradient</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {gradients.map((gradient) => (
                <DropdownMenuItem
                  key={gradient.name}
                  onClick={() => handleGradientChange(gradient.class)}
                  className={gradient.class ? gradient.class : ""}
                >
                  {gradient.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}