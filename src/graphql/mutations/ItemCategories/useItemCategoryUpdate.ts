import { gql } from '@apollo/client';
import { ItemCategory } from '../../queries/itemCategories/ItemCategory';
import { getMutationHook } from '../../types';

export interface ItemCategoryUpdateArgs {
    id: string;
    label: string;
}

export interface ItemCategoryUpdateRes {
    updateItemCategory: ItemCategory;
}

export const UpdateItemCategory = gql`
    mutation UpdateItemCategory($id: ObjectId!, $label: String!) {
        updateItemCategory(id: $id, label: $label) {
            _id
            label
        }
    }
`;

export const useItemCategoryUpdate = getMutationHook<
    ItemCategoryUpdateRes,
    ItemCategoryUpdateArgs
>(UpdateItemCategory);
