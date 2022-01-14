import { TinyCompany } from './../Company/Company';
import { Base } from '../Base/Base';

export enum ExpenseKey {
    Bol = 'Bol',
    Itinerary = 'Itinerary',
    Lot = 'Lot',
    Order = 'Order',
}

export const expenseLabels: Record<ExpenseKey, string> = {
    [ExpenseKey.Lot]: 'Item Procurement',
    [ExpenseKey.Bol]: 'Bulk Procurement',
    [ExpenseKey.Itinerary]: 'Transportation',
    [ExpenseKey.Order]: 'Product Order',
};

export interface Expense extends Base {
    against: string;
    amount: number;
    key: ExpenseKey;
    customer: TinyCompany;
    vendor: TinyCompany;
    note?: string | null;
    invoice?: string | null;
}
