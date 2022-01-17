import { TinyItemFragment } from './../items/useTinyItems';
import { RecipeFragment } from './../../schema/Recipe/Recipe';
import { getQueryHook } from './../../types';
import { BaseFragment } from './../../fragments/BaseFragment';
import { Folder, FolderFragment } from './../../schema/Folder/Folder';
import { gql } from '@apollo/client';

export const FolderQuery = gql`
    ${BaseFragment}
    ${FolderFragment}
    ${RecipeFragment}
    ${TinyItemFragment}
    query FolderQuery($id: ObjectId) {
        folder(id: $id) {
            ...FolderFragment
        }
    }
`;

export interface FolderRes {
    folder: Folder;
}

export interface FolderArgs {
    id: string | null;
}

export const useFolder = getQueryHook<FolderRes, FolderArgs>(FolderQuery);
