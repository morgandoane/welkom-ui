import { gql } from '@apollo/client';
import { TinyCompany } from '../Company/Company';
import { Expense } from '../Expense/Expense';
import { TinyLot } from '../Lot/Lot';
import { TinyUnit } from '../Unit/Unit';

export interface FulfillmentLotContent {
    vendor: TinyCompany;
    lot: TinyLot;
    client_unit: TinyUnit;
    client_qty: number;
    base_qty: number;
    fulfillment_content_expenses: Expense[];
}

export const FulfillmentLotContentFragment = gql`
    fragment FulfillmentLotContentFragment on FulfillmentLotContent {
        vendor {
            ...TinyCompanyFragment
        }
        lot {
            ...TinyLotFragment
        }
        client_unit {
            ...TinyUnitFragment
        }
        client_qty
        base_qty
        fulfillment_content_expenses {
            ...ExpenseFragment
        }
    }
`;
