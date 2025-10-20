import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '@/components/ui/table';
import { schoolCalendar, weeklyActivities } from '@/lib/calendar-data';

export default function CalendarSection() {
  return (
    <section id="calendar" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              School Calendar
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Important dates and weekly schedule for the academic session.
            </p>
          </div>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                    <CardTitle className="font-headline">Academic Calendar 2025-2026</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full border rounded-md overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schoolCalendar.map((event) => (
                                    <TableRow key={event.event}>
                                        <TableCell className="font-medium">{event.event}</TableCell>
                                        <TableCell>{event.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                    <CardTitle className="font-headline">Weekly Activities</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="w-full border rounded-md overflow-x-auto">
                        <Table>
                             <TableHeader>
                                <TableRow>
                                    <TableHead>Activity</TableHead>
                                    <TableHead>Day</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {weeklyActivities.map((activity) => (
                                    <TableRow key={activity.activity}>
                                        <TableCell className="font-medium">{activity.activity}</TableCell>
                                        <TableCell>{activity.day}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
