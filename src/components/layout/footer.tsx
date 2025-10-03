import { Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 text-center md:flex-row md:space-y-0">
          <div className="flex items-center gap-2">
            <Image
              src="https://res.cloudinary.com/dbczzmftw/image/upload/v1759502804/iwwqxsmjuyvyeoxdlgxm.png"
              alt="Self-Starters House Montessori Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Self-Starters House Montessori. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
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
