'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import NewsForm from './news-form';

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  content: string;
}

const initialNews: NewsArticle[] = [
    { id: '1', title: 'Welcome to the New School Year!', date: '2024-09-01', content: 'We are excited to welcome all our students, new and returning, to the 2024-2025 academic session. We wish you a successful year ahead.' },
    { id: '2', title: 'Annual Inter-House Sports Competition', date: '2024-10-15', content: 'Our annual sports day will be held on October 15th. All parents are invited to cheer for our young athletes.' },
    { id: '3', title: 'PTA Meeting Announcement', date: '2024-09-20', content: 'The first Parent-Teacher Association meeting of the term will be held on September 20th. Your participation is highly encouraged.' },
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>(initialNews);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNews = (article: Omit<NewsArticle, 'id'>) => {
    const newArticle = { ...article, id: new Date().toISOString() };
    setNews(prevNews => [newArticle, ...prevNews]);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage News</CardTitle>
          <CardDescription>Create, edit, and manage news articles for your website.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Article</DialogTitle>
            </DialogHeader>
            <NewsForm onSubmit={handleAddNews} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Content</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {news.length > 0 ? (
                        news.map((article) => (
                            <TableRow key={article.id}>
                                <TableCell className="font-medium">{article.title}</TableCell>
                                <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
                                <TableCell className="max-w-md truncate">{article.content}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">No news articles yet.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
