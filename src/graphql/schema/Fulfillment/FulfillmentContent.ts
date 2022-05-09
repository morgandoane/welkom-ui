import { gql } from '@apollo/client';
import { Expense } from '../Expense/Expense';
import { TinyItem } from '../Item/Item';
import { QualityCheckResponse } from '../QualityCheckResponse/QualityCheckResponse';
import { FulfillmentLotContent } from './FulfillmentlotContent';

export class FulfillmentContent {
    item!: TinyItem;
    base_qty!: number;
    pallet_count!: number;
    lots!: FulfillmentLotContent[];
    quality_check_responses!: QualityCheckResponse[];
    procurement_expenses!: Expense[];
    fulfillment_expenses!: Expense[];
}

export const FulfillmentContentFragment = gql`
    fragment FulfillmentContentFragment on FulfillmentContent {
        item {
            ...TinyItemFragment
        }
        base_qty
        pallet_count
        lots {
            ...FulfillmentLotContentFragment
        }
        quality_check_responses {
            ...QualityCheckResponseFragment
        }
        procurement_expenses {
            ...ExpenseFragment
        }
        fulfillment_expenses {
            ...ExpenseFragment
        }
    }
`;
