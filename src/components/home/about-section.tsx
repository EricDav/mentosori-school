import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const staffMembers = [
  {
    id: 'staff-1',
    name: 'Dr. Evelyn Reed',
    role: 'Principal',
    initials: 'ER',
  },
  {
    id: 'staff-2',
    name: 'Mr. David Chen',
    role: 'Vice Principal',
    initials: 'DC',
  },
  {
    id: 'staff-3',
    name: 'Ms. Olivia Hayes',
    role: 'Head of Science',
    initials: 'OH',
  },
  {
    id: 'staff-4',
    name: 'Mr. Benjamin Carter',
    role: 'Director of Arts',
    initials: 'BC',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Mission & Leadership
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We are dedicated to fostering a supportive and challenging environment where students can achieve their full potential, academically, socially, and personally.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-2 lg:gap-12">
          {staffMembers.map((member) => {
            const staffImage = PlaceHolderImages.find((img) => img.id === member.id);
            return (
              <Card key={member.id} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    {staffImage && (
                      <AvatarImage 
                        src={staffImage.imageUrl} 
                        alt={staffImage.description}
                        data-ai-hint={staffImage.imageHint}
                      />
                    )}
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="font-headline">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
