'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import GalleryForm from './gallery-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface GalleryImage {
  id: number;
  imageUrl: string;
  title: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { toast } = useToast();
  const [imageToDelete, setImageToDelete] = useState<GalleryImage | null>(null);


  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('auth-token');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch('https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/galleries', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch gallery images.');
      
      const data = await response.json();
      setImages(data.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleFormFinished = () => {
      setIsFormOpen(false);
      fetchGallery();
  }

  const handleDeleteImage = async (id: number) => {
    setDeletingId(id);
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(`https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to delete image.');
      
      toast({ title: 'Success!', description: 'Image removed from the gallery.' });
      setImages(prev => prev.filter(img => img.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      toast({ variant: 'destructive', title: 'Error deleting image', description: errorMessage });
    } finally {
        setDeletingId(null);
        setImageToDelete(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Gallery</CardTitle>
          <CardDescription>Add, view, and remove images from your website's gallery.</CardDescription>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Gallery Image</DialogTitle>
            </DialogHeader>
            <GalleryForm onFinished={handleFormFinished} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full" />
            ))}
          </div>
        )}

        {error && (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.length > 0 ? (
              images.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="aspect-video relative">
                      <Image
                        src={image.imageUrl}
                        alt={image.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                     <p className="font-medium truncate">{image.title}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="destructive" className="w-full" disabled={deletingId === image.id} onClick={() => setImageToDelete(image)}>
                        {deletingId === image.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                        <Trash2 className="mr-2 h-4 w-4" />
                        )}
                        Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p>No gallery images found. Add your first image to get started.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
       <AlertDialog open={!!imageToDelete} onOpenChange={(open) => !open && setImageToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the image from your gallery.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setImageToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => imageToDelete && handleDeleteImage(imageToDelete.id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </Card>
  );
}
