import ContentToolClient from "@/components/admin/content-tool-client";
import { redirect } from 'next/navigation';

// This is a placeholder check. In a real app, you'd have a robust auth check.
const isAuthenticated = () => {
  // For now, let's assume if there's a token, the user is authenticated.
  // This check should be done in a more secure way in a real application.
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('auth-token');
  }
  return false;
};

export default function ContentToolPage() {
    // This page is now part of the admin dashboard, and should be protected.
    // However, since server components can't access localStorage directly,
    // and we are not implementing a full-fledged auth system with contexts/providers yet,
    // the actual protection will happen on the client side in a layout or middleware.
    // For now, we leave the redirect logic out of the page component.

    return (
        <div className="container mx-auto max-w-3xl py-12 md:py-24">
            <div className="space-y-4 text-center mb-12">
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">AI Content Generation Tool</h1>
                <p className="text-muted-foreground md:text-xl">
                    Describe current school events, and our AI will suggest a news article title and outline for you.
                </p>
            </div>
            <ContentToolClient />
        </div>
    );
}
