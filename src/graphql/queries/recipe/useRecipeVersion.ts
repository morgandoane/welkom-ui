import { TinyItemFragment } from './../items/useTinyItems';
import { RecipeFragment } from './../../schema/Recipe/Recipe';
import { RecipeStepFragment } from './../../schema/RecipeStep/RecipeStep';
import { TinyUnitFragment } from './../../schema/Unit/Unit';
import {
    RecipeVersion,
    RecipeVersionFragment,
} from './../../schema/RecipeVersion/RecipeVersion';
import { gql } from '@apollo/client';
import { getQueryHook } from './../../types';
import { BaseFragment } from '../../fragments/BaseFragment';
import { RecipeSectionFragment } from '../../schema/RecipeStep/RecipeStep';

export const RecipeVersionQuery = gql`
    ${BaseFragment}
    ${RecipeSectionFragment}
    ${TinyItemFragment}
    ${TinyUnitFragment}
    ${RecipeVersionFragment}
    ${RecipeStepFragment}
    ${TinyItemFragment}
    query ($id: ObjectId!) {
        recipeVersion(id: $id) {
            ...RecipeVersionFragment
        }
    }
`;

export interface RecipeVersionArgs {
    id: string;
}

export interface RecipeVersionRes {
    recipeVersion: RecipeVersion;
}

export const useRecipeVersion = getQueryHook<
    RecipeVersionRes,
    RecipeVersionArgs
>(RecipeVersionQuery);
