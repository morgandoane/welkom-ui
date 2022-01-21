import { TinyItemFragment } from './../../queries/items/useTinyItems';
import { BaseFragment } from '../../fragments/BaseFragment';
import { Recipe, RecipeFragment } from '../../schema/Recipe/Recipe';
import { getMutationHook } from '../../types';
import { gql } from '@apollo/client';
import { UpdateRecipeInput } from '../../schema/Recipe/RecipeInputs';
import {
    RecipeSectionFragment,
    RecipeStepFragment,
} from '../../schema/RecipeStep/RecipeStep';
import { RecipeVersionFragment } from '../../schema/RecipeVersion/RecipeVersion';
import { TinyUnitFragment } from '../../schema/Unit/Unit';

const UpdateRecipe = gql`
    ${BaseFragment}
    ${RecipeFragment}
    ${TinyItemFragment}
    ${TinyUnitFragment}
    ${RecipeVersionFragment}
    ${RecipeSectionFragment}
    ${RecipeStepFragment}
    mutation UpdateRecipe($id: ObjectId!, $data: UpdateRecipeInput!) {
        updateRecipe(id: $id, data: $data) {
            ...RecipeFragment
        }
    }
`;

export interface UpdateRecipeRes {
    updateRecipe: Recipe;
}

export interface UpdateRecipeArgs {
    id: string;
    data: UpdateRecipeInput;
}

export const useRecipeUpdate = getMutationHook<
    UpdateRecipeRes,
    UpdateRecipeArgs
>(UpdateRecipe);
