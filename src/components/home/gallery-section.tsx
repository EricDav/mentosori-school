'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

interface GalleryImage {
  id: number;
  imageUrl: string;
}

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGalleries() {
      try {
        const response = await fetch('https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/galleries');
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images.');
        }
        const data = await response.json();
        setImages(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    }

    fetchGalleries();
  }, []);

  return (
    <section id="new-gallery" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Gallery
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A glimpse into our world.
            </p>
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="p-1">
                <Skeleton className="w-full h-full aspect-video" />
              </div>
            ))}
          </div>
        )}
        
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="p-1">
                <Card className="overflow-hidden">
                  <CardContent className="flex aspect-video items-center justify-center p-0">
                    <Image
                      src={image.imageUrl}
                      alt={`Gallery image ${image.id}`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
