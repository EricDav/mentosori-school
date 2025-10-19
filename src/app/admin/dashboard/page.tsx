import { Users, BookCopy, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const statCards = [
  {
    title: 'Registrations',
    icon: Users,
    href: '/admin/dashboard/registrations',
    description: 'View and manage student applications.',
  },
  {
    title: 'News',
    icon: Newspaper,
    href: '/admin/dashboard/news',
    description: 'Create and publish news articles.',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="p-6 md:p-8 rounded-lg bg-gradient-to-br from-primary to-accent/80 text-primary-foreground shadow-lg">
        <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl">Admin Dashboard</h1>
        <p className="mt-4 text-base text-primary-foreground/80 md:text-xl">Welcome back! Manage your school's content from here.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <Link href={card.href} key={card.title}>
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium font-headline">{card.title}</CardTitle>
                <card.icon className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
