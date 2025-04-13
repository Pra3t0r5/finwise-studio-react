# **App Name**: FinWise

## Core Features:

- Configuration: Configure location, main currency, and secondary currencies.
- Document Upload: Upload monthly financial documents (DOC, DOCX, PDF, PNG, JPG, TXT).
- Exchange Rate Input: Input current currency exchange rates manually for currency conversion accuracy.
- AI Finance Interpretation: AI-powered document interpretation and data categorization, acting as a tool to correctly identify income, expenses and debts.
- Report Generation & Insights: Generate financial reports with starting money, expenses by category, savings, and variation against the previous month, with AI-driven insights.

## Style Guidelines:

- Primary color: Dark Purple (#4B0082) to align with 'La Libertad Avanza' party's branding.
- Secondary color: Light Gray (#D3D3D3) for a neutral and clean background.
- Accent: Gold (#FFD700) for highlights and interactive elements, symbolizing economic prosperity.
- Clean and straightforward layout with a focus on bold typography and high contrast for a strong visual impact.
- Use a modern, sans-serif font for headings and body text to convey a sense of forward-thinking and efficiency.
- Incorporate minimalist icons with sharp lines to reflect precision and a no-nonsense approach.
- Subtle transitions and animations that emphasize speed and efficiency, reinforcing the idea of progress and advancement.

## Original User Request:
An app that lets me configure:
- My location (from where IA must be conditioned to understand the local economy, financing and legal context)
- My main currency (as example, argentine pesos)
- Secondary currencies (as example, usd)

Then, on a monthly basis, upload:
- Current currency exchange rate 
- Credit card summaries
- Bank account movements resumees
- Payslips
- Custom information (via typing)
- Bills
- Estimated monthly inflation

And then the app uses IA to read and interpret the documents generates the finances report with:
- Starting money (before paying credit cards and bills)
- Expenses by category and total expenses
- Savings after paying debts
- Variation against a selected month (by default last one) 
- IA generated insights

Allowed upload formats are:
- DOC, DOCX, PDF, PNG, JPG, TXT

The main idea is to have the app following the best local practices in home financing to interpret the documents perfectly, summarizing and categorizing all data with several default calculations. Then, also have comparisons with the last month. Keep in mind that if the user chooses to select alternate currencies after its main currency, we must assume that they handle a mixed currency enconomy, and conversions must be made automatically to the main currency using data provided by the user firstly, or fallbacks from online searches.
  