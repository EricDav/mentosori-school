import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const newsItems = [
  {
    title: 'Annual Science Fair Winners Announced',
    date: 'March 15, 2024',
    category: 'Academics',
    description: 'Our students showcased incredible innovation at this year\'s science fair. See the list of winners and their groundbreaking projects.',
  },
  {
    title: 'Varsity Basketball Team Wins Championship',
    date: 'March 12, 2024',
    category: 'Sports',
    description: 'A thrilling final match saw our team clinch the championship title. Read the full game report and celebrate with our champions.',
  },
  {
    title: 'Upcoming Parent-Teacher Conferences',
    date: 'March 10, 2024',
    category: 'Announcement',
    description: 'Parent-teacher conferences are scheduled for the last week of March. Please sign up for a slot to discuss your child\'s progress.',
  },
];

export default function NewsSection() {
  return (
    <section id="news" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              News & Announcements
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay up-to-date with the latest happenings and important announcements from our school.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <Card key={item.title} className="flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                  <Badge variant="outline" className="ml-4 shrink-0">{item.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground pt-1">{item.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
