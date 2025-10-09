import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';

const newsItems = [
  {
    id: 'school-calendar',
    title: 'School Calendar 2025-2026',
    date: 'September 1, 2025',
    category: 'Academics',
    description: 'Upcoming events for the 2025-2026 school year, including resumption, holidays, tests, and more.',
    href: '/news/school-calendar',
  },
  {
    id: 'vision-future',
    title: 'Our Vision for the Future',
    date: 'September 20, 2023',
    category: 'Future Plans',
    description: 'We strive to be one of the best nursery/primary schools in Nigeria by the year 2035 and one of the leading educational institutions in West Africa, delivering a world-class and well-rounded education by the year 2040.',
    href: '/news/vision-future',
  },
  {
    id: 'dynamic-world',
    title: 'Preparing Children for a Dynamic World',
    date: 'September 15, 2023',
    category: 'Education Philosophy',
    description: 'For children to be able to think out of the box, early childhood is the best time to start. We need to produce children who are thinkers. Most of the jobs in existence today were not in existence ten or twenty years ago.',
    href: '/news/dynamic-world',
  },
];

export default function NewsSection() {
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <Card key={item.title} className="flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                    <Badge variant="outline" className="ml-4 shrink-0">{item.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground pt-1">{item.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                </CardContent>
              </div>
              <div className="p-6 pt-0">
                <Link href={item.href} className="text-sm font-semibold text-accent hover:underline">
                  View More
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
