"use client";

import Link from "next/link";
import { socialLinks, author } from "@/lib/data";
import { Twitter, Instagram, Linkedin } from "lucide-react";

const socialIcons = {
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} {author.name}. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.icon as keyof typeof socialIcons];
            return (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{social.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}