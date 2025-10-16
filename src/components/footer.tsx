import Link from "next/link";
import { socialLinks, author, SocialLink } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* Author Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-primary mb-1">
              {author.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {author.tagline}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((social: SocialLink) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} {author.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}