// This file is machine-generated - DO NOT EDIT.
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating financial insights from user-provided data.
 *
 * - generateFinancialInsights - A function that triggers the financial insights generation flow.
 * - GenerateFinancialInsightsInput - The input type for the generateFinancialInsights function.
 * - GenerateFinancialInsightsOutput - The return type for the generateFinancialInsights function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateFinancialInsightsInputSchema = z.object({
  startingMoney: z.number().describe('The starting amount of money before expenses.'),
  expensesByCategory: z.record(z.number()).describe('A record of expenses categorized by type.'),
  totalExpenses: z.number().describe('The total amount of expenses.'),
  savings: z.number().describe('The amount of savings after paying debts.'),
  previousMonthVariation: z
    .number()
    .describe('The variation in finances compared to the previous month.'),
  financialContext: z
    .string()
    .describe(
      'Financial context information provided by the user, including location, main currency, and secondary currencies.'
    ),
  monthlyData: z.string().describe('A description of the uploaded financial documents.'),
});
export type GenerateFinancialInsightsInput = z.infer<typeof GenerateFinancialInsightsInputSchema>;

const GenerateFinancialInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights about the user\'s financial situation.'),
});
export type GenerateFinancialInsightsOutput = z.infer<typeof GenerateFinancialInsightsOutputSchema>;

export async function generateFinancialInsights(input: GenerateFinancialInsightsInput): Promise<GenerateFinancialInsightsOutput> {
  return generateFinancialInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFinancialInsightsPrompt',
  input: {
    schema: z.object({
      startingMoney: z.number().describe('The starting amount of money before expenses.'),
      expensesByCategory: z.record(z.number()).describe('A record of expenses categorized by type.'),
      totalExpenses: z.number().describe('The total amount of expenses.'),
      savings: z.number().describe('The amount of savings after paying debts.'),
      previousMonthVariation: z
        .number()
        .describe('The variation in finances compared to the previous month.'),
      financialContext: z
        .string()
        .describe(
          'Financial context information provided by the user, including location, main currency, and secondary currencies.'
        ),
      monthlyData: z.string().describe('A description of the uploaded financial documents.'),
    }),
  },
  output: {
    schema: z.object({
      insights: z.string().describe('AI-generated insights about the user\'s financial situation.'),
    }),
  },
  prompt: `You are a financial advisor analyzing a user's financial data to provide insights.

  Based on the following information, generate insights about potential areas for savings, unusual spending patterns, and comparisons to the previous month.
  Consider the financial context provided by the user.

  Financial Context: {{{financialContext}}}
  Starting Money: {{{startingMoney}}}
  Expenses by Category: {{{expensesByCategory}}}
  Total Expenses: {{{totalExpenses}}}
  Savings: {{{savings}}}
  Variation Against Previous Month: {{{previousMonthVariation}}}
  Monthly Data Description: {{{monthlyData}}}

  Provide the insights in a concise and easy-to-understand manner.
  `,
});

const generateFinancialInsightsFlow = ai.defineFlow<
  typeof GenerateFinancialInsightsInputSchema,
  typeof GenerateFinancialInsightsOutputSchema
>(
  {
    name: 'generateFinancialInsightsFlow',
    inputSchema: GenerateFinancialInsightsInputSchema,
    outputSchema: GenerateFinancialInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
