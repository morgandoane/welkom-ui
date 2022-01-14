import { RangeInput } from './../Range/RangeInput';
import { ExpenseKey } from './Expense';
import { BaseFilter } from './../Base/BaseFilter';

export interface ExpenseFilter extends BaseFilter {
    key?: ExpenseKey;
    amount?: RangeInput;
    against?: string;
}
