import { RecipeFilter } from './../../schema/Recipe/RecipeFilter';
import { RecipeList } from './../../schema/Recipe/RecipeList';
import { getQueryHook } from '../../types';
import { BaseFragment } from '../../fragments/BaseFragment';
import { RecipeFragment } from '../../schema/Recipe/Recipe';
import { gql } from '@apollo/client';

export const RecipesQuery = gql`
    ${BaseFragment}
    ${RecipeFragment}
    query Recipes($filter: RecipeFilter!) {
        recipes(filter: $filter) {
            count
            items {
                ...RecipeFragment
            }
        }
    }
`;

export interface RecipesRes {
    recipes: RecipeList;
}

export interface RecipesArgs {
    filter: RecipeFilter;
}

export const useRecipes = getQueryHook<RecipesRes, RecipesArgs>(RecipesQuery);
