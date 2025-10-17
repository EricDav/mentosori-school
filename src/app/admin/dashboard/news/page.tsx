'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import NewsForm from './news-form';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
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

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  content: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<NewsArticle | null>(null);
  const { toast } = useToast();

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) throw new Error("Authentication token not found.");
      const response = await fetch('https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/news', {
         headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch news.');
      const data = await response.json();
      const articles = data.data.map((item: any) => ({
        ...item,
        content: item.description,
      }));
      setNews(articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleFormSubmit = async (values: Omit<NewsArticle, 'id'>) => {
    const isEditing = !!selectedArticle;
    const url = isEditing
      ? `https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/news/${selectedArticle.id}`
      : 'https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/news';
    const method = isEditing ? 'PATCH' : 'POST';

    try {
      const token = localStorage.getItem('auth-token');
      if (!token) throw new Error("Authentication token not found.");

      const payload = {
          title: values.title,
          date: values.date,
          description: values.content,
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} article.`);
      }
      
      toast({
        title: 'Success!',
        description: `News article has been ${isEditing ? 'updated' : 'added'}.`,
      });

      handleDialogClose();
      fetchNews(); // Re-fetch news to show the latest data
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: err instanceof Error ? err.message : 'An unknown error occurred.',
      });
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(`https://geolocation-ananlysis-cf3b7de3e9c8.herokuapp.com/v1/starter/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to delete article.');
      }
      
      toast({
        title: 'Success!',
        description: 'News article has been deleted.',
      });

      setNews(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error deleting article',
        description: err instanceof Error ? err.message : 'An unknown error occurred.',
      });
    } finally {
        setArticleToDelete(null);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedArticle(null);
  };
  
  const handleOpenDialog = (article: NewsArticle | null = null) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage News</CardTitle>
          <CardDescription>Create, edit, and manage news articles for your website.</CardDescription>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add News
        </Button>
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
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Content</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {news.length > 0 ? (
                            news.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell className="font-medium max-w-xs truncate">{article.title}</TableCell>
                                    <TableCell className="whitespace-nowrap">{new Date(article.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="max-w-md truncate">{article.content}</TableCell>
                                    <TableCell className="text-right space-x-2 whitespace-nowrap">
                                        <Button variant="outline" size="icon" onClick={() => handleOpenDialog(article)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => setArticleToDelete(article)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No news articles yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedArticle ? 'Edit Article' : 'Add New Article'}</DialogTitle>
            </DialogHeader>
            <NewsForm onSubmit={handleFormSubmit} onFinished={handleDialogClose} article={selectedArticle} />
          </DialogContent>
      </Dialog>

      <AlertDialog open={!!articleToDelete} onOpenChange={(open) => !open && setArticleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setArticleToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => articleToDelete && handleDeleteArticle(articleToDelete.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </Card>
  );
}
