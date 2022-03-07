import { AppFragment } from './../../types';
import { Identified } from './../Base/Base';
import { CompanyFragment } from './../Company/Company';
import { UploadEnabled } from './../UploadEnabled/UploadEnabled';
import { Company } from '../Company/Company';
import { ExpenseClass } from '../../inputsTypes';
import { gql } from '@apollo/client';

export interface Expense extends UploadEnabled {
    amount: number;
    customer: Company;
    vendor: Company;
    expense_class: ExpenseClass;
    against: string;
}

export interface TinyExpense extends Identified {
    amount: number;
    customer: Company;
    vendor: Company;
    expense_class: ExpenseClass;
    against: string;
}

export const ExpenseFragment = new AppFragment(
    gql`
        fragment ExpenseFragment on Expense {
            ...UploadEnabledFragment
            amount
            customer {
                ...CompanyFragment
            }
            vendor {
                ...CompanyFragment
            }
            expense_class
            against
        }
    `,
    [CompanyFragment]
);

export const TinyExpenseFragment = new AppFragment(
    gql`
        fragment TinyExpenseFragment on Expense {
            _id
            amount
            customer {
                ...CompanyFragment
            }
            vendor {
                ...CompanyFragment
            }
            expense_class
            against
        }
    `,
    [CompanyFragment]
);
