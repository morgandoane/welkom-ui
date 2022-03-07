import { AppFragment } from './../../types';
import { UploadEnabled } from './../UploadEnabled/UploadEnabled';
import { TinyExpense, TinyExpenseFragment } from './../Expense/Expense';
import { gql } from '@apollo/client';
import { TinyProfileFragment } from '../Profile/Profile';

export interface Expensed extends UploadEnabled {
    expenses: TinyExpense[];
}

export const ExpensedFragment = new AppFragment(
    gql`
        fragment ExpensedFragment on ExpensedUnion {
            _id
            date_created
            created_by {
                ...TinyProfileFragment
            }
            deleted
            note
            expenses {
                ...TinyExpenseFragment
            }
        }
    `,
    [TinyProfileFragment, TinyExpenseFragment]
);
