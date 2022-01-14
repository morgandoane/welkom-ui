import { BaseFragment } from './../../fragments/BaseFragment';
import { getMutationHook } from './../../types';
import { CreateExpenseInput } from './../../schema/Expense/ExpenseInput';
import { ExpenseFragment } from './useExpenses';
import { gql } from '@apollo/client';
import { Expense } from '../../schema/Expense/Expense';

export const CreateExpense = gql`
    ${BaseFragment}
    ${ExpenseFragment}
    mutation ($data: CreateExpenseInput!) {
        createExpense(data: $data) {
            ...ExpenseFragment
        }
    }
`;

export interface CreateExpenseRes {
    createExpense: Expense;
}

export interface CreateExpenseArgs {
    data: CreateExpenseInput;
}

export const useExpenseCreation = getMutationHook<
    CreateExpenseRes,
    CreateExpenseArgs
>(CreateExpense);
