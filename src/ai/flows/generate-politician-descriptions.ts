'use server';

/**
 * @fileOverview A flow that generates RPG-style descriptions for politicians based on their policy stances.
 *
 * - generatePoliticianDescription - A function that generates the description.
 * - GeneratePoliticianDescriptionInput - The input type for the generatePoliticianDescription function.
 * - GeneratePoliticianDescriptionOutput - The return type for the generatePoliticianDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePoliticianDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the politician.'),
  office: z.string().describe('The office held by the politician.'),
  educationScore: z.number().describe('The politician\'s score on education policy (0-100).'),
  healthcareScore: z.number().describe('The politician\'s score on healthcare policy (0-100).'),
  economyScore: z.number().describe('The politician\'s score on economic policy (0-100).'),
  environmentScore: z.number().describe('The politician\'s score on environmental policy (0-100).'),
  infrastructureScore: z.number().describe('The politician\'s score on infrastructure policy (0-100).'),
  criminalJusticeScore: z.number().describe('The politician\'s score on criminal justice policy (0-100).'),
  socialIssuesScore: z.number().describe('The politician\'s score on social issues policy (0-100).'),
  immigrationScore: z.number().describe('The politician\'s score on immigration policy (0-100).'),
});
export type GeneratePoliticianDescriptionInput = z.infer<typeof GeneratePoliticianDescriptionInputSchema>;

const GeneratePoliticianDescriptionOutputSchema = z.object({
  description: z.string().describe('An RPG-style description of the politician based on their policy stances.'),
});
export type GeneratePoliticianDescriptionOutput = z.infer<typeof GeneratePoliticianDescriptionOutputSchema>;

export async function generatePoliticianDescription(input: GeneratePoliticianDescriptionInput): Promise<GeneratePoliticianDescriptionOutput> {
  return generatePoliticianDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePoliticianDescriptionPrompt',
  input: {schema: GeneratePoliticianDescriptionInputSchema},
  output: {schema: GeneratePoliticianDescriptionOutputSchema},
  prompt: `You are a creative writer who specializes in creating RPG-style character descriptions.

You are writing a description for a politician named {{name}} who holds the office of {{office}}.

Based on their policy stances, craft an engaging and entertaining RPG-style description.

Here are their policy scores (0-100):
- Education: {{educationScore}}
- Healthcare: {{healthcareScore}}
- Economy: {{economyScore}}
- Environment: {{environmentScore}}
- Infrastructure: {{infrastructureScore}}
- Criminal Justice: {{criminalJusticeScore}}
- Social Issues: {{socialIssuesScore}}
- Immigration: {{immigrationScore}}

Description:`,
});

const generatePoliticianDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePoliticianDescriptionFlow',
    inputSchema: GeneratePoliticianDescriptionInputSchema,
    outputSchema: GeneratePoliticianDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
