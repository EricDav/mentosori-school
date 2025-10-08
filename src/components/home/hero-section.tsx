import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center gap-4 p-4">
        <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Welcome to Self-Starters House Montessori
        </h1>
        <p className="max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
          Nurturing Minds, Building Futures. Discover a place where learning comes alive.
        </p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4">
          <Link href="/#contact">Contact Admin</Link>
        </Button>
      </div>
    </section>
  );
}
