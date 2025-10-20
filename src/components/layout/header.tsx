
'use client';

import Link from 'next/link';
import { Menu, ChevronDown, LayoutDashboard, Users, Newspaper, GalleryHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";


const navLinks = [
  { href: '/', label: 'Home' },
  { 
    href: '/about', 
    label: 'About Us',
    subLinks: [
      { href: '/about#preparatory', label: 'Preparatory' },
      { href: '/about#nursery-primary', label: 'Nursery' },
      { href: '/about#nursery-primary', label: 'Primary' },
    ]
  },
  { href: '/#new-gallery', label: 'Gallery' },
  { href: '/#news', label: 'News and Events' },
  { href: '/#calendar', label: 'Calendar' },
  { href: '/#contact', label: 'Contact' },
  { href: '/register', label: 'Register' },
];

const adminNavLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/dashboard/registrations', label: 'Registrations', icon: Users },
    { href: '/admin/dashboard/news', label: 'News', icon: Newspaper },
    { href: '/admin/dashboard/gallery', label: 'Gallery', icon: GalleryHorizontal },
];

export default function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token);
  }, [pathname]); // Re-check on route change


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center h-full py-2">
          <Image
            src="https://res.cloudinary.com/dbczzmftw/image/upload/v1760126571/ec1fjovxmtfwhjwwgjxj.png"
            alt="Self-Starters House Montessori Logo"
            width={150}
            height={80}
            className="object-contain h-full w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
          {navLinks.map((link) => (
            link.subLinks ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={cn("text-foreground/60 transition-colors hover:text-foreground/80 font-bold", (pathname.startsWith(link.href) || link.subLinks.some(sl => pathname === sl.href)) && "text-foreground/90")}>
                    {link.label}
                    <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.subLinks.map((subLink) => (
                    <DropdownMenuItem key={subLink.href} asChild>
                      <Link href={subLink.href}>{subLink.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn("text-foreground/60 transition-colors hover:text-foreground/80 font-bold", pathname === link.href && "text-foreground")}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-bold mt-8">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4" onClick={() => setSheetOpen(false)}>
                 <Image
                    src="https://res.cloudinary.com/dbczzmftw/image/upload/v1760126571/ec1fjovxmtfwhjwwgjxj.png"
                    alt="Self-Starters House Montessori Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
              </Link>
              {navLinks.map((link) => (
                link.subLinks ? (
                  <Collapsible key={link.label}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-bold text-muted-foreground transition-colors hover:text-foreground group">
                      {link.label}
                      <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="grid gap-4 pl-6 pt-4">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                            onClick={() => setSheetOpen(false)}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-bold text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setSheetOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}

              {isLoggedIn && (
                <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-bold text-muted-foreground transition-colors hover:text-foreground group">
                      Admin
                      <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="grid gap-4 pl-6 pt-4">
                        {adminNavLinks.map((subLink) => (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
                            onClick={() => setSheetOpen(false)}
                          >
                            <subLink.icon className="h-5 w-5" />
                            <span>{subLink.label}</span>
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
