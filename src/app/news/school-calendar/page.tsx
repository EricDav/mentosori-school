import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const calendarEvents = [
  { event: 'Resumption', date: 'Monday 15th September 2025' },
  { event: 'Independence Day', date: 'Wednesday 1st Oct, 2025' },
  { event: 'Career Day', date: 'Thursday 16th October, 2025' },
  { event: 'Mid-term test', date: 'Monday 27th - Friday 31st Oct, 2025' },
  { event: 'Open Day', date: 'Thursday 30th Oct, 2025' },
  { event: 'Mid term break', date: 'Monday 3rd - Friday 7th Nov, 2025' },
  { event: 'Excursion', date: 'Thursday 27th November 2025' },
  { event: 'Examination', date: 'Monday 8th - Friday 12th Dec 2025' },
  { event: 'Vacation', date: 'Thursday 18th December, 2025' },
  { event: 'Resumption', date: 'Monday 12th January, 2026' },
];

const weeklyActivities = [
    { activity: 'Karate class', day: 'Every Tuesday' },
    { activity: 'Swimming Lesson', day: 'Every Wednesday' },
    { activity: 'Coding class', day: 'Every Thursday' },
];

export default function SchoolCalendarPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-24">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">School Calendar 2025-2026</h1>
        <p className="text-muted-foreground md:text-xl">
          Important dates and events for the academic year.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calendarEvents.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.event}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Weekly Activities</CardTitle>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Activity</TableHead>
                            <TableHead>Schedule</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {weeklyActivities.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.activity}</TableCell>
                                <TableCell>{item.day}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <p className="text-sm text-muted-foreground mt-4">NB: Weekly activities are part of our co-curricular program.</p>
            </CardContent>
        </Card>
    </div>
  );
}
