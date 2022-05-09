import { gql } from '@apollo/client';
import { Base, TinyBase } from '../Base/Base';
import { FulfillmentBol } from '../Bol/Bol';
import { Expense } from '../Expense/Expense';
import { FulfillmentContent } from './FulfillmentContent';
import { FulfillmentType } from './FulfillmentType';

export interface Fulfillment extends Base {
    bol: FulfillmentBol;
    type: FulfillmentType;
    pallet_count: number;
    contents: FulfillmentContent[];
    bol_expenses: Expense[];
}

export interface TinyFulfillment extends TinyBase {
    bol: FulfillmentBol;
    type: FulfillmentType;
    pallet_count: number;
    contents: FulfillmentContent[];
    bol_expenses: Expense[];
}

export const FulfillmentFragment = gql`
    fragment FulfillmentFragment on Fulfillment {
        ...BaseFragment
        bol {
            ...FulfillmentBolFragment
        }
        type
        pallet_count
        contents {
            ...FulfillmentContentFragment
        }
        bol_expenses {
            ...ExpenseFragment
        }
    }
`;

export const TinyFulfillmentFragment = gql`
    fragment TinyFulfillmentFragment on Fulfillment {
        ...TinyBaseFragment
        bol {
            ...FulfillmentBolFragment
        }
        type
        pallet_count
        contents {
            ...FulfillmentContentFragment
        }
        bol_expenses {
            ...ExpenseFragment
        }
    }
`;
