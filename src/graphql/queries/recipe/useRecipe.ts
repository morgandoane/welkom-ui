import { getQueryHook } from './../../types';
import { BaseFragment } from './../../fragments/BaseFragment';
import { Recipe, RecipeFragment } from './../../schema/Recipe/Recipe';
import { gql } from '@apollo/client';

export const RecipeQuery = gql`
    ${BaseFragment}
    ${RecipeFragment}
    query Recipe($id: ObjectId!) {
        recipe(id: $id) {
            ...RecipeFragment
        }
    }
`;

export interface RecipeRes {
    recipe: Recipe;
}

export interface RecipeArgs {
    id: string;
}

export const useRecipe = getQueryHook<RecipeRes, RecipeArgs>(RecipeQuery);
