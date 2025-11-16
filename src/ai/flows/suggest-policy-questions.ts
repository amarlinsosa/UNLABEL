'use server';

/**
 * @fileOverview Generates policy questions for the quiz. 
 *
 * - suggestPolicyQuestions - A function that generates a set of policy questions.
 * - SuggestPolicyQuestionsInput - The input type for the suggestPolicyQuestions function.
 * - SuggestPolicyQuestionsOutput - The return type for the suggestPolicyQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPolicyQuestionsInputSchema = z.object({
  topic: z.string().describe('The policy topic to generate questions for, such as education or healthcare.'),
  numQuestions: z.number().describe('The number of questions to generate.'),
});
export type SuggestPolicyQuestionsInput = z.infer<typeof SuggestPolicyQuestionsInputSchema>;

const SuggestPolicyQuestionsOutputSchema = z.object({
  questions: z.array(
    z.object({
      text: z.string().describe('The text of the policy question.'),
      policyCategory: z.string().describe('The policy category the question belongs to.'),
    })
  ).describe('A list of generated policy questions.'),
});
export type SuggestPolicyQuestionsOutput = z.infer<typeof SuggestPolicyQuestionsOutputSchema>;

export async function suggestPolicyQuestions(input: SuggestPolicyQuestionsInput): Promise<SuggestPolicyQuestionsOutput> {
  return suggestPolicyQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPolicyQuestionsPrompt',
  input: {schema: SuggestPolicyQuestionsInputSchema},
  output: {schema: SuggestPolicyQuestionsOutputSchema},
  prompt: `You are an expert in policy and question generation.
  Generate {{numQuestions}} policy questions for the topic: {{topic}}.
  The questions should be clear, concise, and unbiased. The output should be a JSON array of questions with 'text' and 'policyCategory' fields.`,
});

const suggestPolicyQuestionsFlow = ai.defineFlow(
  {
    name: 'suggestPolicyQuestionsFlow',
    inputSchema: SuggestPolicyQuestionsInputSchema,
    outputSchema: SuggestPolicyQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
