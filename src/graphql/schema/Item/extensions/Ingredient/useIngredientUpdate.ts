import { gql } from '@apollo/client';
import { UpdateIngredientInput } from '../../../../inputsTypes';
import { getMutationHook } from '../../../../types';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { ItemFragment } from '../../Item';
import { IngredientFragment, Ingredient } from './Ingredient';

export const UpdateIngredientMutation = gql`
    ${IngredientFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    mutation UpdateIngredientMutation(
        $id: ObjectId!
        $data: UpdateIngredientInput!
    ) {
        updateIngredient(id: $id, data: $data) {
            ...IngredientFragment
        }
    }
`;

export const useIngredientUpdate = getMutationHook<
    { updateIngredient: Ingredient },
    { id: string; data: UpdateIngredientInput }
>(UpdateIngredientMutation);
