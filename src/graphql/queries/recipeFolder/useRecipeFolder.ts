import { FolderFragment } from './../../schema/Folder/Folder';
import { TinyRecipeFragment } from './../../schema/Recipe/Recipe';
import { BaseFragment } from './../../fragments/BaseFragment';
import {
    RecipeFolder,
    RecipeFolderFragment,
} from './../../schema/Folder/extensions/RecipeFolder/RecipeFolder';
import { getQueryHook } from './../../types';
import { gql } from '@apollo/client';

const RecipeFolderQuery = gql`
    ${BaseFragment}
    ${RecipeFolderFragment}
    ${FolderFragment}
    ${TinyRecipeFragment}
    query RecipeFolderQuery($id: ObjectId) {
        recipeFolder(id: $id) {
            ...RecipeFolderFragment
        }
    }
`;

export interface RecipeFolderRes {
    recipeFolder: RecipeFolder;
}

export interface RecipeFolderArgs {
    id: string | null;
}

export const useRecipeFolder = getQueryHook<RecipeFolderRes, RecipeFolderArgs>(
    RecipeFolderQuery
);
