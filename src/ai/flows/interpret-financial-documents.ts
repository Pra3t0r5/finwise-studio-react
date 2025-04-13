'use server';

/**
 * @fileOverview Interprets financial documents to extract income, expenses, and debts.
 *
 * - interpretFinancialDocuments - A function that interprets financial documents.
 * - InterpretFinancialDocumentsInput - The input type for the interpretFinancialDocuments function.
 * - InterpretFinancialDocumentsOutput - The return type for the interpretFinancialDocuments function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const InterpretFinancialDocumentsInputSchema = z.object({
  documents: z
    .array(
      z.object({
        filename: z.string().describe('The name of the uploaded file.'),
        fileType: z.string().describe('The type of the uploaded file (DOC, DOCX, PDF, PNG, JPG, TXT).'),
        fileContent: z.string().describe('The content of the uploaded file as a string.'),
      })
    )
    .describe('An array of financial documents to interpret.'),
  mainCurrency: z.string().describe('The main currency used for financial reporting (e.g., USD, EUR).'),
  secondaryCurrencies: z
    .array(z.string())
    .optional()
    .describe('An array of secondary currencies to consider for conversion.'),
  monthlyInflationEstimate: z.number().optional().describe('Estimated monthly inflation rate as a decimal (e.g., 0.05 for 5%).'),
  location: z.string().describe('The location of the user, important for understanding the local economy, financing, and legal context.'),
});

export type InterpretFinancialDocumentsInput = z.infer<
  typeof InterpretFinancialDocumentsInputSchema
>;

const InterpretFinancialDocumentsOutputSchema = z.object({
  income: z.array(z.object({
    source: z.string().describe('The source of the income (e.g., salary, dividends).'),
    amount: z.number().describe('The amount of income.'),
    currency: z.string().describe('The currency of the income.'),
  })).describe('Parsed income records from the documents.'),
  expenses: z.array(z.object({
    category: z.string().describe('The category of the expense (e.g., rent, groceries).'),
    amount: z.number().describe('The amount of the expense.'),
    currency: z.string().describe('The currency of the expense.'),
  })).describe('Parsed expense records from the documents.'),
  debts: z.array(z.object({
    creditor: z.string().describe('The creditor for the debt (e.g., bank, credit card company).'),
    amount: z.number().describe('The amount of the debt.'),
    currency: z.string().describe('The currency of the debt.'),
    dueDate: z.string().optional().describe('The due date for the debt payment (YYYY-MM-DD).'),
  })).describe('Parsed debt records from the documents.'),
});

export type InterpretFinancialDocumentsOutput = z.infer<
  typeof InterpretFinancialDocumentsOutputSchema
>;

export async function interpretFinancialDocuments(
  input: InterpretFinancialDocumentsInput
): Promise<InterpretFinancialDocumentsOutput> {
  return interpretFinancialDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretFinancialDocumentsPrompt',
  input: {
    schema: z.object({
      documents: z
        .array(
          z.object({
            filename: z.string().describe('The name of the uploaded file.'),
            fileType: z.string().describe('The type of the uploaded file (DOC, DOCX, PDF, PNG, JPG, TXT).'),
            fileContent: z.string().describe('The content of the uploaded file as a string.'),
          })
        )
        .describe('An array of financial documents to interpret.'),
      mainCurrency: z.string().describe('The main currency used for financial reporting (e.g., USD, EUR).'),
      secondaryCurrencies: z
        .array(z.string())
        .optional()
        .describe('An array of secondary currencies to consider for conversion.'),
      monthlyInflationEstimate: z.number().optional().describe('Estimated monthly inflation rate as a decimal (e.g., 0.05 for 5%).'),
      location: z.string().describe('The location of the user, important for understanding the local economy, financing, and legal context.'),
    }),
  },
  output: {
    schema: z.object({
      income: z.array(z.object({
        source: z.string().describe('The source of the income (e.g., salary, dividends).'),
        amount: z.number().describe('The amount of income.'),
        currency: z.string().describe('The currency of the income.'),
      })).describe('Parsed income records from the documents.'),
      expenses: z.array(z.object({
        category: z.string().describe('The category of the expense (e.g., rent, groceries).'),
        amount: z.number().describe('The amount of the expense.'),
        currency: z.string().describe('The currency of the expense.'),
      })).describe('Parsed expense records from the documents.'),
      debts: z.array(z.object({
        creditor: z.string().describe('The creditor for the debt (e.g., bank, credit card company).'),
        amount: z.number().describe('The amount of the debt.'),
        currency: z.string().describe('The currency of the debt.'),
        dueDate: z.string().optional().describe('The due date for the debt payment (YYYY-MM-DD).'),
      })).describe('Parsed debt records from the documents.'),
    }),
  },
  prompt: `You are a financial expert tasked with interpreting financial documents.

  Analyze the provided documents to extract information about income, expenses, and debts.
  Consider the user's location: {{{location}}}, main currency: {{{mainCurrency}}}, secondary currencies: {{#if secondaryCurrencies}}{{{secondaryCurrencies}}}{{else}}None{{/if}}, and monthly inflation estimate: {{#if monthlyInflationEstimate}}{{{monthlyInflationEstimate}}}{{else}}None{{/if}} when interpreting the documents.

  Files:
  {{#each documents}}
  Filename: {{{this.filename}}}
  File Type: {{{this.fileType}}}
  Content: {{{this.fileContent}}}
  {{/each}}

  Based on this information, extract income, expenses, and debts. Return the data in JSON format.
  Ensure that monetary values are represented as numbers.
  `, 
});

const interpretFinancialDocumentsFlow = ai.defineFlow<
  typeof InterpretFinancialDocumentsInputSchema,
  typeof InterpretFinancialDocumentsOutputSchema
>(
  {
    name: 'interpretFinancialDocumentsFlow',
    inputSchema: InterpretFinancialDocumentsInputSchema,
    outputSchema: InterpretFinancialDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
