import { gql } from '@apollo/client';
import { getQueryHook } from '../../types';
import { ItemCategory } from './ItemCategory';

export const ItemCategoriesQuery = gql`
    query ItemCategoriesQuery {
        itemCategories {
            _id
            label
        }
    }
`;

export const useItemCategories =
    getQueryHook<{ itemCategories: ItemCategory[] }>(ItemCategoriesQuery);
