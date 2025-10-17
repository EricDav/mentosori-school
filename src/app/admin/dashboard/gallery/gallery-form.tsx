'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  file: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (files) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
});

type GalleryFormValues = z.infer<typeof formSchema>;

interface GalleryFormProps {
  onFinished: () => void;
}

export default function GalleryForm({ onFinished }: GalleryFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      file: undefined,
    },
  });

  const fileRef = form.register('file');

  async function handleFormSubmit(values: GalleryFormValues) {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) throw new Error('Authentication token not found.');

      // Step 1: Upload the image file
      const imageFile = values.file[0];
      const formData = new FormData();
      formData.append('file', imageFile);

      const imageUploadResponse = await fetch('https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/products/images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!imageUploadResponse.ok) {
        throw new Error('Failed to upload image.');
      }

      const imageUploadResult = await imageUploadResponse.json();
      const imageUrl = imageUploadResult.url;

      // Step 2: Create the gallery entry with the new URL
      const galleryPayload = {
        title: values.title,
        imageUrl: imageUrl,
      };

      const createGalleryResponse = await fetch('https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(galleryPayload),
      });

      if (!createGalleryResponse.ok) {
        const errorData = await createGalleryResponse.json();
        throw new Error(errorData.message || 'Failed to add image to gallery.');
      }

      toast({ title: 'Success!', description: 'New image added to the gallery.' });
      onFinished();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      toast({ variant: 'destructive', title: 'Error adding image', description: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Image Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image File</FormLabel>
              <FormControl>
                <Input type="file" accept="image/jpeg,image/png,image/webp" {...fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Image
        </Button>
      </form>
    </Form>
  );
}
