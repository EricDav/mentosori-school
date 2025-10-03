'use server';

/**
 * @fileOverview Generates news article suggestions based on current school events.
 *
 * - generateNewsArticleSuggestions - A function that handles the generation of news article suggestions.
 * - GenerateNewsArticleSuggestionsInput - The input type for the generateNewsArticleSuggestions function.
 * - GenerateNewsArticleSuggestionsOutput - The return type for the generateNewsArticleSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNewsArticleSuggestionsInputSchema = z.object({
  currentSchoolEvents: z
    .string()
    .describe('A description of the current school events.'),
});
export type GenerateNewsArticleSuggestionsInput = z.infer<
  typeof GenerateNewsArticleSuggestionsInputSchema
>;

const GenerateNewsArticleSuggestionsOutputSchema = z.object({
  articleTitle: z.string().describe('The suggested title for the article.'),
  articleOutline: z
    .string()
    .describe('The suggested outline for the article.'),
});
export type GenerateNewsArticleSuggestionsOutput = z.infer<
  typeof GenerateNewsArticleSuggestionsOutputSchema
>;

export async function generateNewsArticleSuggestions(
  input: GenerateNewsArticleSuggestionsInput
): Promise<GenerateNewsArticleSuggestionsOutput> {
  return generateNewsArticleSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNewsArticleSuggestionsPrompt',
  input: {schema: GenerateNewsArticleSuggestionsInputSchema},
  output: {schema: GenerateNewsArticleSuggestionsOutputSchema},
  prompt: `You are a creative content writer for a school website.
  Based on the description of the current school events, suggest a relevant news article title and outline.
  Current School Events: {{{currentSchoolEvents}}}`,
});

const generateNewsArticleSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateNewsArticleSuggestionsFlow',
    inputSchema: GenerateNewsArticleSuggestionsInputSchema,
    outputSchema: GenerateNewsArticleSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
