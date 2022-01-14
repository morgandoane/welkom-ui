import { getQueryHook } from './../../types';
import { ExpenseFilter } from './../../schema/Expense/ExpenseFilter';
import { BaseFragment } from './../../fragments/BaseFragment';
import { Pagination } from './../../schema/Pagination/Pagination';
import { gql } from '@apollo/client';
import { Expense } from '../../schema/Expense/Expense';

export const ExpenseFragment = gql`
    fragment ExpenseFragment on Expense {
        ...BaseFragment
        against
        amount
        key
        customer {
            _id
            name
        }
        vendor {
            _id
            name
        }
        invoice
        note
    }
`;

export const ExpensesQuery = gql`
    ${BaseFragment}
    ${ExpenseFragment}
    query ($filter: ExpenseFilter!) {
        expenses(filter: $filter) {
            count
            items {
                ...ExpenseFragment
            }
        }
    }
`;

export interface ExpensesRes {
    expenses: Pagination<Expense>;
}

export interface ExpensesArgs {
    filter: ExpenseFilter;
}

export const useExpenses = getQueryHook<ExpensesRes, ExpensesArgs>(
    ExpensesQuery
);
