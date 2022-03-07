import { Ingredient, IngredientFragment } from './Ingredient';
import { gql } from '@apollo/client';
import { CreateIngredientInput } from '../../../../inputsTypes';
import { getMutationHook } from '../../../../types';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { PalletConfigurationFragment } from '../../../PalletConfiguration/PalletConfiguration';
import { ItemFragment } from '../../Item';

export const CreateIngredientMutation = gql`
    ${IngredientFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    ${PalletConfigurationFragment._document}
    mutation CreateIngredientMutation($data: CreateIngredientInput!) {
        createIngredient(data: $data) {
            ...IngredientFragment
        }
    }
`;

export const useIngredientCreation = getMutationHook<
    { createIngredient: Ingredient },
    { data: CreateIngredientInput }
>(CreateIngredientMutation);
