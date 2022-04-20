import { gql } from '@apollo/client';
import { ItemCategory } from '../../queries/itemCategories/ItemCategory';
import { getMutationHook } from '../../types';

export interface ItemCategoryCreationArgs {
    label: string;
}

export interface ItemCategoryCreationRes {
    createItemCategory: ItemCategory;
}

export const CreateItemCategory = gql`
    mutation CreateItemCategory($label: String!) {
        createItemCategory(label: $label) {
            _id
            label
        }
    }
`;

export const useItemCategoryCreation = getMutationHook<
    ItemCategoryCreationRes,
    ItemCategoryCreationArgs
>(CreateItemCategory);
