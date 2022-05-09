import { Ref } from '../../types';
import { Company } from '../Company/Company';
import { ExpenseClass } from './ExpenseClass';

export interface ExpenseInput {
    customer: Ref<Company>;
    vendor: Ref<Company>;
    class: ExpenseClass;
    amount: number;
    invoice?: string;
    comment?: string;
}
