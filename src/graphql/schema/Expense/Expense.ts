import { TinyCompany } from './../Company/Company';
import { Base } from '../Base/Base';

export enum ExpenseKey {
    Bol = 'Bol',
    Order = 'Order',
    Itinerary = 'Itinerary',
}

export interface Expense extends Base {
    amount: number;
    key: ExpenseKey;
    customer: TinyCompany;
    vendor: TinyCompany;
    note?: string | null;
    invoice?: string | null;
}
