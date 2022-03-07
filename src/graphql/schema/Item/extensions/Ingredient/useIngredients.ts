import { TinyProfileFragment } from './../../../Profile/Profile';
import { ItemFragment } from './../../Item';
import { TinyIngredient, TinyIngredientFragment } from './Ingredient';
import { gql } from '@apollo/client';
import { IngredientFilter } from '../../../../inputsTypes';
import { getFilterQueryHook } from '../../../../types';
import { Pagination } from '../../../../../utils/types/Pagination';
import { PalletConfigurationFragment } from '../../../PalletConfiguration/PalletConfiguration';

export const IngredientQuery = gql`
    ${TinyIngredientFragment._document}
    ${ItemFragment._document}
    ${TinyProfileFragment._document}
    ${PalletConfigurationFragment._document}
    query IngredientQuery($filter: IngredientFilter!) {
        ingredients(filter: $filter) {
            count
            items {
                ...TinyIngredientFragment
            }
        }
    }
`;

export const useIngredients = getFilterQueryHook<
    { ingredients: Pagination<TinyIngredient> },
    { filter: IngredientFilter }
>(IngredientQuery);
