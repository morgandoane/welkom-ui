import { TinyUnitFragment } from './../../schema/Unit/Unit';
import { RecipeStepFragment } from './../../schema/RecipeStep/RecipeStep';
import { RecipeVersionFragment } from './../../schema/RecipeVersion/RecipeVersion';
import { TinyItemFragment } from './../items/useTinyItems';
import { RecipeFragment } from './../../schema/Recipe/Recipe';
import { getQueryHook } from './../../types';
import { BaseFragment } from './../../fragments/BaseFragment';
import { gql } from '@apollo/client';
import { RecipeFolder } from '../../schema/RecipeFolder/RecipeFolder';

export const FolderQuery = gql`
    ${BaseFragment}
    ${RecipeFragment}
    ${TinyItemFragment}
    ${RecipeVersionFragment}
    ${RecipeStepFragment}
    ${TinyUnitFragment}
    query FolderQuery($id: ObjectId) {
        recipefolder(id: $id) {
            ...FolderFragment
        }
    }
`;

export interface FolderRes {
    recipefolder: RecipeFolder;
}

export interface FolderArgs {
    id: string | null;
}

export const useFolder = getQueryHook<FolderRes, FolderArgs>(FolderQuery);
