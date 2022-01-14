import { Expense, ExpenseKey } from './Expense';

export interface CreateExpenseInput {
    amount: number;
    key: ExpenseKey;
    against: string;
    customer: string;
    vendor: string;
    invoice?: string;
    note?: string;
}

export interface UpdateExpenseInput {
    deleted?: boolean;
    amount?: number;
    customer?: string;
    vendor?: string;
    invoice?: string;
    note?: string;
}
