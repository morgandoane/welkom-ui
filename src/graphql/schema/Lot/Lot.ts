import { gql } from '@apollo/client';
import { Base, TinyBase } from '../Base/Base';
import { TinyCompany } from '../Company/Company';
import { Expense } from '../Expense/Expense';
import { TinyItem } from '../Item/Item';
import { TinyLocation } from '../Location/Location';
import { LotContent } from './LotContent';

export interface Lot extends Base {
    code: string;
    company: TinyCompany;
    contents: LotContent[];
    item: TinyItem;
    base_qty: number;
    location?: TinyLocation | null;
    node_expenses: Expense[];
    cached_expenses?: Expense[] | null;
    expenses: Expense[];
}

export interface TinyLot extends TinyBase {
    code: string;
    item: TinyItem;
}

export const LotFragment = gql`
    fragment LotFragment on Lot {
        ...BaseFragment
        code
        company {
            ...TinyCompanyFragment
        }
        contents {
            ...LotContentFragment
        }
        item {
            ...TinyItemFragment
        }
        base_qty
        location {
            ...TinyLocationFragment
        }
        expenses {
            ...ExpenseFragment
        }
    }
`;

export const TinyLotFragment = gql`
    fragment TinyLotFragment on Lot {
        ...TinyBaseFragment
        code
        item {
            ...TinyItemFragment
        }
    }
`;
