import { BaseFragment } from './../../fragments/BaseFragment';
import { getMutationHook } from '../../types';
import { UpdateExpenseInput } from '../../schema/Expense/ExpenseInput';
import { ExpenseFragment } from './useExpenses';
import { gql } from '@apollo/client';
import { Expense } from '../../schema/Expense/Expense';

export const UpdateExpense = gql`
    ${BaseFragment}
    ${ExpenseFragment}
    mutation ($id: ObjectId!, $data: UpdateExpenseInput!) {
        updateExpense(id: $id, data: $data) {
            ...ExpenseFragment
        }
    }
`;

export interface UpdateExpenseRes {
    updateExpense: Expense;
}

export interface UpdateExpenseArgs {
    id: string;
    data: UpdateExpenseInput;
}

export const useExpenseUpdate = getMutationHook<
    UpdateExpenseRes,
    UpdateExpenseArgs
>(UpdateExpense);
