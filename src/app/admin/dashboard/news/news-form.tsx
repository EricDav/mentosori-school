'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import type { NewsArticle } from './page';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  date: z.string().min(1, { message: 'Date is required.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }),
});

type NewsFormValues = z.infer<typeof formSchema>;

interface NewsFormProps {
    onSubmit: (values: NewsFormValues) => void;
    onFinished: () => void;
    article: NewsArticle | null;
}

export default function NewsForm({ onSubmit, onFinished, article }: NewsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: new Date().toISOString().split('T')[0],
      content: '',
    },
  });

  useEffect(() => {
    if (article) {
        form.reset({
            title: article.title,
            date: new Date(article.date).toISOString().split('T')[0],
            content: article.content,
        });
    } else {
        form.reset({
            title: '',
            date: new Date().toISOString().split('T')[0],
            content: '',
        });
    }
  }, [article, form]);


  async function handleFormSubmit(values: NewsFormValues) {
    setIsSubmitting(true);
    try {
        await onSubmit(values);
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
                <Input placeholder="Article Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publication Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your article content here..." {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onFinished}>
                Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {article ? 'Save Changes' : 'Add Article'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
