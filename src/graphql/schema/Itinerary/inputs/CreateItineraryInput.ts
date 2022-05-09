import { ExpenseInput } from '../../Expense/ExpenseInput';
import { ItineraryDocumentationInput } from './ItineraryDocumentationInput';

export interface CreateItineraryInput {
    documentation?: ItineraryDocumentationInput;
    expenses: ExpenseInput[];
}
