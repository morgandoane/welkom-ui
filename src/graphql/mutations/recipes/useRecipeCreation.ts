import { TinyItemFragment } from './../../queries/items/useTinyItems';
import { BaseFragment } from './../../fragments/BaseFragment';
import { Recipe, RecipeFragment } from './../../schema/Recipe/Recipe';
import { getMutationHook } from './../../types';
import { gql } from '@apollo/client';
import { CreateRecipeInput } from '../../schema/Recipe/RecipeInputs';

const CreateRecipe = gql`
    ${BaseFragment}
    ${RecipeFragment}
    ${TinyItemFragment}
    mutation CreateRecipe($data: CreateRecipeInput!) {
        createRecipe(data: $data) {
            ...RecipeFragment
        }
    }
`;

export interface CreateRecipeRes {
    createRecipe: Recipe;
}

export interface CreateRecipeArgs {
    data: CreateRecipeInput;
}

export const useRecipeCreation = getMutationHook<
    CreateRecipeRes,
    CreateRecipeArgs
>(CreateRecipe);
