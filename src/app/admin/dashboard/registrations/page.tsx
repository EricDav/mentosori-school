'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Mail, Phone, Calendar, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [registrationToDelete, setRegistrationToDelete] = useState<Registration | null>(null);
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

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const response = await fetch(`https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/registers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete registration.');
      }

      setRegistrations(registrations.filter((reg) => reg.id !== id));
      toast({
        title: 'Registration deleted',
        description: 'The registration has been successfully deleted.',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Error deleting registration',
        description: errorMessage,
      });
    } finally {
        setRegistrationToDelete(null);
    }
  };
  
  return (
    <>
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
            <div className="w-full border rounded-md overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap"><User className="inline-block mr-2 h-4 w-4" />Student Name</TableHead>
                    <TableHead className="whitespace-nowrap"><Calendar className="inline-block mr-2 h-4 w-4" />Date of Birth</TableHead>
                    <TableHead className="whitespace-nowrap"><User className="inline-block mr-2 h-4 w-4" />Parent Name</TableHead>
                    <TableHead className="whitespace-nowrap"><Mail className="inline-block mr-2 h-4 w-4" />Parent Email</TableHead>
                    <TableHead className="whitespace-nowrap"><Phone className="inline-block mr-2 h-4 w-4" />Parent Phone</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
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
                        <TableCell>
                          <Button variant="destructive" size="icon" onClick={() => setRegistrationToDelete(reg)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">No registrations found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      <AlertDialog open={!!registrationToDelete} onOpenChange={(open) => !open && setRegistrationToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the registration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setRegistrationToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => registrationToDelete && handleDelete(registrationToDelete.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
