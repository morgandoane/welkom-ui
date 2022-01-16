import { getQueryHook } from './../../types';
import { BaseFragment } from './../../fragments/BaseFragment';
import { Folder, FolderFragment } from './../../schema/Folder/Folder';
import { gql } from '@apollo/client';
import { TinyRecipeFragment } from '../../schema/Recipe/Recipe';

export const FolderQuery = gql`
    ${BaseFragment}
    ${FolderFragment}
    ${TinyRecipeFragment}
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
