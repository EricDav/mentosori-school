'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Mail, Phone, Calendar } from 'lucide-react';

interface Registration {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  subject: string;
  parentFirstName: string;
  parentLastName: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        setLoading(true);
        const token = localStorage.getItem('auth-token');
        if (!token) {
          throw new Error('Authentication token not found.');
        }

        const response = await fetch('https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/registers', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch registrations.');
        }
        
        const data = await response.json();
        setRegistrations(data.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Error fetching registrations',
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchRegistrations();
  }, [toast]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrations</CardTitle>
        <CardDescription>Here are the applications submitted through your registration form.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}

        {error && (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {!loading && !error && (
          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><User className="inline-block mr-2 h-4 w-4" />Student Name</TableHead>
                  <TableHead><Calendar className="inline-block mr-2 h-4 w-4" />Date of Birth</TableHead>
                  <TableHead><User className="inline-block mr-2 h-4 w-4" />Parent Name</TableHead>
                  <TableHead><Mail className="inline-block mr-2 h-4 w-4" />Parent Email</TableHead>
                  <TableHead><Phone className="inline-block mr-2 h-4 w-4" />Parent Phone</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.length > 0 ? (
                  registrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium whitespace-nowrap">{reg.firstName} {reg.lastName}</TableCell>
                      <TableCell className="whitespace-nowrap">{new Date(reg.dateOfBirth).toLocaleDateString()}</TableCell>
                      <TableCell className="whitespace-nowrap">{reg.parentFirstName} {reg.parentLastName}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>{reg.phone}</TableCell>
                      <TableCell>{reg.subject}</TableCell>
                      <TableCell className="whitespace-nowrap">{new Date(reg.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No registrations found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
