import { TinyUnitFragment } from './../../schema/Unit/Unit';
import {
    RecipeSectionFragment,
    RecipeStepFragment,
} from './../../schema/RecipeStep/RecipeStep';
import { RecipeVersionFragment } from './../../schema/RecipeVersion/RecipeVersion';
import { TinyItemFragment } from './../items/useTinyItems';
import { Pagination } from './../../schema/Pagination/Pagination';
import {
    TionyRecipeVersion,
    TinyRecipeVersionFragment,
} from './../../schema/RecipeVersion/TinyRecipeVersion';
import { getQueryHook } from './../../types';
import { BaseFragment } from './../../fragments/BaseFragment';
import { Recipe, RecipeFragment } from './../../schema/Recipe/Recipe';
import { gql } from '@apollo/client';

export const RecipeQuery = gql`
    ${BaseFragment}
    ${RecipeFragment}
    ${TinyItemFragment}
    ${TinyRecipeVersionFragment}
    ${RecipeVersionFragment}
    ${RecipeSectionFragment}
    ${RecipeStepFragment}
    ${TinyUnitFragment}
    query Recipe($id: ObjectId!, $skip: Float!, $take: Float!) {
        recipe(id: $id) {
            ...RecipeFragment
        }
        recipeVersions(filter: { skip: $skip, take: $take, recipe: $id }) {
            count
            items {
                ...TinyRecipeVersionFragment
            }
        }
    }
`;

export interface RecipeRes {
    recipe: Recipe;
    recipeVersions: Pagination<TionyRecipeVersion>;
}

export interface RecipeArgs {
    id: string;
    skip: number;
    take: number;
}

export const useRecipe = getQueryHook<RecipeRes, RecipeArgs>(RecipeQuery);
