import Link from "next/link";
import { socialLinks, author, SocialLink } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Author Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">{author.name}</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {author.bio}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social: SocialLink) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <social.icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {author.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}