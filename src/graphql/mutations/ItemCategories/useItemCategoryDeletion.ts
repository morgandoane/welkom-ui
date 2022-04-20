import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';

export interface ItemCategoryDeletionArgs {
    id: string;
}

export interface ItemCategoryDeletionRes {
    deleteItemCategory: boolean;
}

export const DeleteItemCategory = gql`
    mutation DeleteItemCategory($id: ObjectId!) {
        deleteItemCategory(id: $id)
    }
`;

export const useItemCategoryDeletion = getMutationHook<
    ItemCategoryDeletionRes,
    ItemCategoryDeletionArgs
>(DeleteItemCategory);
