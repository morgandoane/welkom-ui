import { AppFragment } from './../../types';
import { gql } from '@apollo/client';
import { TinyCompany, TinyCompanyFragment } from './../Company/Company';

export interface ExpenseSummary {
    total_amount: number | null;
    customer: TinyCompany;
    holdup: string | null;
}

export const ExpenseSummaryFragment = new AppFragment(
    gql`
        fragment ExpenseSummaryFragment on ExpenseSummary {
            total_amount
            customer {
                ...TinyCompanyFragment
            }
            holdup
        }
    `,
    [TinyCompanyFragment]
);
