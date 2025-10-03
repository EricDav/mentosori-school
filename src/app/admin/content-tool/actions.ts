'use server';

import { generateNewsArticleSuggestions } from '@/ai/flows/generate-news-article-suggestions';
import { z } from 'zod';

const formSchema = z.object({
  currentSchoolEvents: z.string().min(10, 'Please describe the events in at least 10 characters.'),
});

export type FormState = {
  message: string;
  data?: {
    articleTitle: string;
    articleOutline: string;
  };
  fields?: Record<string, string>;
};

export async function getArticleSuggestion(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    currentSchoolEvents: formData.get('currentSchoolEvents'),
  });

  if (!validatedFields.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(validatedFields.error.flatten().fieldErrors)) {
        fields[key] = validatedFields.error.flatten().fieldErrors[key]!.join(", ");
    }
    return {
      message: 'Error: Please check the fields.',
      fields,
    };
  }

  try {
    const result = await generateNewsArticleSuggestions(validatedFields.data);
    return {
      message: 'Suggestion generated successfully!',
      data: result,
    };
  } catch (error) {
    return {
      message: `Error: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`,
    };
  }
}
