import { getQueryHook } from './../../types';
import { BaseFragment } from './../../fragments/BaseFragment';
import { Pagination } from './../../schema/Pagination/Pagination';
import { gql } from '@apollo/client';
import { Expense } from '../../schema/Expense/Expense';
import { ExpenseFragment } from './useExpenses';

export const ExpenseQuery = gql`
    ${BaseFragment}
    ${ExpenseFragment}
    query ($id: ObjectId!) {
        expense(id: $id) {
            ...ExpenseFragment
        }
    }
`;

export interface ExpenseRes {
    expense: Expense;
}

export interface ExpenseArgs {
    id: string;
}

export const useExpense = getQueryHook<ExpenseRes, ExpenseArgs>(ExpenseQuery);
