export type IncomeSource = {
    id: string;
    name: string;
    amount: number;
    expectedDateRange: {
        start: number; // Day of month (1-31)
        end?: number;   // Day of month (1-31)
    };
    isRecurring: boolean;
};

export type ExpenseCategory = 'Rent' | 'Food Order' | 'Personal' | 'Regular' | 'Restaurants' | 'Other';

export type ExpenseItem = {
    id: string;
    name: string;
    amount: number;
    category: ExpenseCategory;
    isFixed: boolean; // True for Rent, Wifi. False for Food, Transport (variable)
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
