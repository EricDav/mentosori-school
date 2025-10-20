
'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarHeader, SidebarInset, SidebarFooter } from '@/components/ui/sidebar';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Newspaper, Users, LayoutDashboard, LogOut, GalleryHorizontal, PanelLeft, Menu } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileSheetOpen, setMobileSheetOpen] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      router.replace('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    router.push('/admin/login');
  };
  
  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/dashboard/registrations', label: 'Registrations', icon: Users },
    { href: '/admin/dashboard/news', label: 'News', icon: Newspaper },
    { href: '/admin/dashboard/gallery', label: 'Gallery', icon: GalleryHorizontal },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
          <SidebarHeader>
             <div className="flex items-center justify-end p-2">
                <SidebarTrigger>
                  <Button variant="ghost" size="icon">
                    <PanelLeft className="h-6 w-6" />
                  </Button>
                </SidebarTrigger>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.href)}
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
           <SidebarFooter className="mt-auto">
             <SidebarMenu>
                 <SidebarMenuItem>
                     <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                         <LogOut />
                         <span>Logout</span>
                     </SidebarMenuButton>
                 </SidebarMenuItem>
             </SidebarMenu>
           </SidebarFooter>
      </Sidebar>
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:hidden">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                <LayoutDashboard className="h-6 w-6" />
                <span>Dashboard</span>
            </Link>
            <Sheet open={isMobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <nav className="grid gap-6 text-lg font-medium mt-8">
                        <Link href="/admin/dashboard" className="flex items-center gap-2 text-lg font-semibold mb-4" onClick={() => setMobileSheetOpen(false)}>
                            <LayoutDashboard className="h-6 w-6" />
                            <span>Dashboard</span>
                        </Link>
                        {navItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-4"
                            onClick={() => setMobileSheetOpen(false)}
                          >
                             <item.icon className="h-5 w-5" />
                            {item.label}
                          </Link>
                        ))}
                         <Button onClick={handleLogout} className="mt-auto">
                            <LogOut className="mr-2 h-4 w-4"/> Logout
                         </Button>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
