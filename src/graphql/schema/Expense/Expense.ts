import { TinyCompany } from '../Company/Company';
import { Itinerary } from '../Itinerary/Itinerary';
import { Fulfillment } from '../Fulfillment/Fulfillment';
import { ExpenseClass } from './ExpenseClass';
import { Ref } from '../../types';
import { gql } from '@apollo/client';

export interface Expense {
    root: Ref<Itinerary | Fulfillment>;
    customer: TinyCompany;
    vendor: TinyCompany;
    class: ExpenseClass;
    amount: number;
    invoice?: string;
    comment?: string;
}

export const ExpenseFragment = gql`
    fragment ExpenseFragment on Expense {
        root
        customer {
            ...TinyCompanyFragment
        }
        vendor {
            ...TinyCompanyFragment
        }
        class
        amount
        invoice
        comment
    }
`;
