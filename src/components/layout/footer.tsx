import { Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Self-Starters House Montessori. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
               <Link href="/admin/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Admin
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <Facebook className="h-5 w-5" />
              </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
