import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              About Self-Starters House Montessori
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We are committed to holistic development and to harnessing the potential of the child; by providing a distinctive rounded education of uniformly high quality, in a Montessori prepared environment.
            </p>
          </div>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4">
            <Link href="/about">Read More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
