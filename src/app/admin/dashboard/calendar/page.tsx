'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CalendarPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>School Calendar</CardTitle>
        <CardDescription>Manage important dates and events for the school year.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <div className="text-center">
            <p className="text-lg font-semibold text-muted-foreground">Calendar Management Coming Soon</p>
            <p className="text-sm text-muted-foreground">This section is under construction.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
