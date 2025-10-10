'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarHeader, SidebarInset, SidebarFooter } from '@/components/ui/sidebar';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { BookCopy, Newspaper, Users, LayoutDashboard, LogOut } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

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
    { href: '/admin/dashboard/contacts', label: 'Contacts', icon: BookCopy },
    { href: '/admin/dashboard/news', label: 'News', icon: Newspaper },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
          <SidebarHeader>
             <div className="flex items-center justify-between p-2">
                 <Button variant="ghost" size="icon" asChild>
                    <Image
                        src="https://res.cloudinary.com/dbczzmftw/image/upload/v1760126571/ec1fjovxmtfwhjwwgjxj.png"
                        alt="Logo"
                        width={150}
                        height={40}
                        className='p-1'
                    />
                 </Button>
                <SidebarTrigger />
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
                     <SidebarMenuButton onClick={handleLogout}>
                         <LogOut />
                         <span>Logout</span>
                     </SidebarMenuButton>
                 </SidebarMenuItem>
             </SidebarMenu>
           </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 sm:p-6 md:p-8">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
