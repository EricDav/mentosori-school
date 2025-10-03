'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getArticleSuggestion, type FormState } from '@/app/admin/content-tool/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Generate Suggestion
    </Button>
  );
}

export default function ContentToolClient() {
  const [state, formAction] = useFormState(getArticleSuggestion, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message.startsWith('Error:')) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    } else if (state.message) {
      toast({
        title: 'Success',
        description: state.message,
      });
      if (state.data) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Event Description</CardTitle>
          <CardDescription>
            Provide details about a recent or upcoming school event (e.g., science fair, sports competition, school play).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <Textarea
              name="currentSchoolEvents"
              placeholder="e.g., 'The annual school science fair took place last week, with over 50 projects from students in grades 6-12...'"
              rows={5}
              required
              className="min-h-[120px]"
            />
             {state.fields?.currentSchoolEvents && (
              <p className="text-sm font-medium text-destructive">{state.fields.currentSchoolEvents}</p>
            )}
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state.data && (
        <div className="space-y-8">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-center">AI Generated Suggestion</h3>
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>Suggested Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{state.data.articleTitle}</p>
            </CardContent>
          </Card>
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>Suggested Outline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{state.data.articleOutline}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
