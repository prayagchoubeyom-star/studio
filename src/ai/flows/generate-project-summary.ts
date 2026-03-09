'use server';
/**
 * @fileOverview An AI agent that generates captivating project summaries and relevant keywords from raw project details.
 *
 * - generateProjectSummary - A function that handles the project summary generation process.
 * - GenerateProjectSummaryInput - The input type for the generateProjectSummary function.
 * - GenerateProjectSummaryOutput - The return type for the generateProjectSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectSummaryInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  rawDescription: z
    .string()
    .describe('A detailed, raw description of the project.'),
  technologiesUsed: z
    .array(z.string())
    .describe('A list of technologies and frameworks used in the project.'),
  keyFeatures: z
    .array(z.string())
    .describe('A list of key features or functionalities of the project.'),
  targetAudience: z
    .string()
    .describe('The intended audience or users of the project.'),
  developerNotes: z
    .string()
    .optional()
    .describe(
      'Any specific notes or details the developer wants to highlight or avoid in the summary.'
    ),
});
export type GenerateProjectSummaryInput = z.infer<
  typeof GenerateProjectSummaryInputSchema
>;

const GenerateProjectSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A captivating and concise summary of the project.'),
  keywords: z
    .array(z.string())
    .describe('A list of relevant keywords for the project.'),
});
export type GenerateProjectSummaryOutput = z.infer<
  typeof GenerateProjectSummaryOutputSchema
>;

export async function generateProjectSummary(
  input: GenerateProjectSummaryInput
): Promise<GenerateProjectSummaryOutput> {
  return generateProjectSummaryFlow(input);
}

const generateProjectSummaryPrompt = ai.definePrompt({
  name: 'generateProjectSummaryPrompt',
  input: {schema: GenerateProjectSummaryInputSchema},
  output: {schema: GenerateProjectSummaryOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in creating compelling project summaries and relevant keywords for developer portfolios. Your goal is to make the project sound as engaging and professional as possible, highlighting its value and innovation.

Generate a captivating project summary (2-3 sentences) and a list of 5-10 relevant keywords based on the following project details. Focus on making the summary concise, benefit-oriented, and appealing to potential clients or employers.

Project Name: {{{projectName}}}
Raw Description: {{{rawDescription}}}
Technologies Used: {{#each technologiesUsed}}- {{{this}}}{{/each}}
Key Features: {{#each keyFeatures}}- {{{this}}}{{/each}}
Target Audience: {{{targetAudience}}}
{{#if developerNotes}}Developer Notes: {{{developerNotes}}}{{/if}}

Output format should be JSON with 'summary' and 'keywords' fields.`,
});

const generateProjectSummaryFlow = ai.defineFlow(
  {
    name: 'generateProjectSummaryFlow',
    inputSchema: GenerateProjectSummaryInputSchema,
    outputSchema: GenerateProjectSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateProjectSummaryPrompt(input);
    return output!;
  }
);
