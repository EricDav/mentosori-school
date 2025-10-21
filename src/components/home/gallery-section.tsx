'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import Autoplay from "embla-carousel-autoplay";
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface GalleryImage {
  id: number;
  imageUrl: string;
  title: string;
}

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

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
    <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
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
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Skeleton className="aspect-video w-full" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
        
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
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
                    {images.map((image) => (
                        <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                               <Dialog>
                                <Card className="overflow-hidden">
                                     <CardHeader>
                                        <CardTitle className="font-headline text-lg truncate">{image.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                         <DialogTrigger asChild>
                                            <div className="cursor-pointer aspect-video">
                                                <Image
                                                    src={image.imageUrl}
                                                    alt={`Gallery image ${image.id}`}
                                                    width={600}
                                                    height={400}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                                />
                                            </div>
                                        </DialogTrigger>
                                    </CardContent>
                                </Card>
                                 <DialogContent className="max-w-3xl p-0">
                                    <Image
                                        src={image.imageUrl}
                                        alt={`Gallery image ${image.id}`}
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-contain rounded-lg"
                                    />
                                </DialogContent>
                               </Dialog>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        )}
      </div>
    </section>
  );
}
