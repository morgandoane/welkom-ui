import { ItemFragment } from '../../Item';
import { Ingredient, IngredientFragment } from './Ingredient';
import { gql } from '@apollo/client';
import { getAtomicQueryHook } from '../../../../types';
import { TinyProfileFragment } from '../../../Profile/Profile';

export const IngredientQuery = gql`
    ${IngredientFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    query IngredientQuery($id: ObjectId!) {
        ingredient(id: $id) {
            ...IngredientFragment
        }
    }
`;

export const useIngredient =
    getAtomicQueryHook<{ ingredient: Ingredient }>(IngredientQuery);
