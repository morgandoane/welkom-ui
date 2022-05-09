import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';
import { ExpenseInput } from '../../Expense/ExpenseInput';
import { ItineraryDocumentationInput } from './ItineraryDocumentationInput';

export interface UpdateItineraryInput extends UpdateBaseInput {
    documentation?: ItineraryDocumentationInput;
    expenses?: ExpenseInput[];
}
