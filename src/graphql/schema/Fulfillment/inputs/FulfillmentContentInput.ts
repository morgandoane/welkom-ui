import { Ref } from '../../../types';
import { ExpenseInput } from '../../Expense/ExpenseInput';
import { Item } from '../../Item/Item';
import { QualityCheckResponseInput } from '../../QualityCheckResponse/QualityCheckResponseInput';
import { FulfillmentLotContentInput } from './FulfillmentlotContentInput';

export interface FulfillmentContentInput {
    item: Ref<Item>;
    pallet_count: number;
    lots: FulfillmentLotContentInput[];
    quality_check_responses: QualityCheckResponseInput[];
    procurement_expenses: ExpenseInput[];
}
