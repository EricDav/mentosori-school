'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  description: string;
}

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    async function fetchArticle() {
      try {
        setLoading(true);
        const response = await fetch(`https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/news/${id}`);
        
        if (response.status === 404) {
          return notFound();
        }

        if (!response.ok) {
          throw new Error('Failed to fetch the news article.');
        }

        const data = await response.json();
        setArticle(data.data);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl py-12 md:py-24">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <div className="space-y-2 pt-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
        <div className="container mx-auto max-w-4xl py-12 md:py-24">
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    );
  }
  
  if (!article) {
    return null; // Or a "not found" component
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-24">
      <article>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">{article.title}</CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground pt-4">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
            </div>
          </CardHeader>
          <CardContent>
             <div className="prose max-w-none text-muted-foreground">
                <p>{article.description}</p>
             </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
