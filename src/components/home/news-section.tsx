'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  date: string;
  description: string;
  category?: string;
}

const TRUNCATE_LENGTH = 120; // Show "View More" if description is longer than this

export default function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await fetch('https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news articles.');
        }
        const data = await response.json();
        const articles = data.data.map((item: any) => ({
          ...item,
          id: item.id.toString(), // Ensure id is a string for consistency
          description: item.description,
        }));
        setNews(articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const handleOpenModal = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  return (
    <section id="news" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              News & Events
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay up-to-date with the latest happenings and important announcements from our school.
            </p>
          </div>
        </div>

        {loading && (
           <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                     <Card className="flex flex-col justify-between h-full">
                        <CardHeader>
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/4" />
                        </CardHeader>
                        <CardContent>
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-full mt-2" />
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Skeleton className="h-5 w-20" />
                        </div>
                      </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        {error && (
            <Alert variant="destructive" className="max-w-6xl mx-auto">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {!loading && !error && news.length > 0 && (
          <Dialog open={!!selectedArticle} onOpenChange={(isOpen) => !isOpen && handleCloseModal()}>
            <Carousel
                plugins={[plugin.current]}
                opts={{
                    align: 'start',
                    loop: true,
                }}
                className="w-full max-w-6xl mx-auto"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                {news.map((item) => (
                    <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                            <Card className="flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full">
                                <div>
                                    <CardHeader>
                                        <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground pt-1">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                                    </CardContent>
                                </div>
                                <div className="p-6 pt-0">
                                    {item.description.length > TRUNCATE_LENGTH ? (
                                      <DialogTrigger asChild>
                                        <Button variant="link" className="text-sm font-semibold text-accent hover:underline p-0 h-auto" onClick={() => handleOpenModal(item)}>
                                            View More
                                        </Button>
                                      </DialogTrigger>
                                    ) : (
                                      <Link href={`/news/${item.id}`} className="text-sm font-semibold text-accent hover:underline">
                                        View More
                                      </Link>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
             {selectedArticle && (
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">{selectedArticle.title}</DialogTitle>
                         <div className="flex items-center gap-2 text-muted-foreground pt-2">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={selectedArticle.date}>
                                {new Date(selectedArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                        </div>
                    </DialogHeader>
                    <div className="py-4 prose max-w-none">
                        <p className="text-muted-foreground">{selectedArticle.description}</p>
                    </div>
                </DialogContent>
            )}
          </Dialog>
        )}
         {!loading && !error && news.length === 0 && (
            <p className="text-center text-muted-foreground">No news articles found.</p>
         )}
      </div>
    </section>
  );
}