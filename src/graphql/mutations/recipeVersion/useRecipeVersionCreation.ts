import { getMutationHook } from './../../types';
import { RecipeVersionInput } from './../../schema/RecipeVersion/RecipeVersionInput';
import {
    RecipeVersion,
    RecipeVersionFragment,
} from './../../schema/RecipeVersion/RecipeVersion';
import { gql } from '@apollo/client';
import { BaseFragment } from '../../fragments/BaseFragment';
import { TinyItemFragment } from '../../queries/items/useTinyItems';
import {
    RecipeSectionFragment,
    RecipeStepFragment,
} from '../../schema/RecipeStep/RecipeStep';
import { TinyUnitFragment } from '../../schema/Unit/Unit';

export const CreateRecipeVersion = gql`
    ${BaseFragment}
    ${RecipeSectionFragment}
    ${TinyItemFragment}
    ${TinyUnitFragment}
    ${RecipeVersionFragment}
    ${RecipeStepFragment}
    ${TinyItemFragment}
    mutation ($data: RecipeVersionInput!) {
        createRecipeVersion(data: $data) {
            ...RecipeVersionFragment
        }
    }
`;

export interface CreateRecipeVersionRes {
    createRecipeVersion: RecipeVersion;
}

export interface CreateRecipeVersionArgs {
    data: RecipeVersionInput;
}

export const useRecipeVersionCreation = getMutationHook<
    CreateRecipeVersionRes,
    CreateRecipeVersionArgs
>(CreateRecipeVersion);
