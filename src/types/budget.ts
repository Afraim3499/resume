export type IncomeSource = {
    id: string;
    name: string;
    amount: number;
    expectedDateRange: {
        start: number; // Day of month (1-31) - KEEPING FOR BACKWARD COMPAT (or Recurrence Logic)
        end?: number;   // Day of month (1-31)
    };
    startDate?: string; // ISO Date String (YYYY-MM-DD) for specific next payout
    isRecurring: boolean; // Keeping for backward compat
    repeats: 'monthly' | 'once'; // New standard
};

// Allow custom categories while keeping suggested autocompletes
export type ExpenseCategory = 'Rent' | 'Food Order' | 'Personal' | 'Regular' | 'Restaurants' | 'Other' | string;

export type ExpenseItem = {
    id: string;
    name: string;
    amount: number;
    category: ExpenseCategory;
    isFixed: boolean; // True for Rent, Wifi. False for Food, Transport (variable)
    frequency?: 'monthly' | 'yearly'; // Defaults to monthly if undefined
    isReimbursable?: boolean;
};

export type BudgetConfig = {
    targetInvestment: number;
    currentBalance: number;
    lastUpdated: string;
};

export type TimelineEvent = {
    date: string; // ISO date
    summary: string;
    type: 'income' | 'expense_due';
    amount: number;
};

export type LoanEntry = {
    id: string;
    type: 'lent' | 'borrowed'; // lent = Asset (Receivable), borrowed = Liability (Payable)
    person: string;
    amount: number;
    date: string;
    dueDate?: string;
    status: 'active' | 'settled';
    notes?: string;
};
