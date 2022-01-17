import { RecipeFragment } from './../../schema/Recipe/Recipe';
import { BaseFragment } from './../../fragments/BaseFragment';
import { getMutationHook } from './../../types';
import { CreateFolderInput } from './../../schema/Folder/FolderInput';
import { Folder, FolderFragment } from './../../schema/Folder/Folder';
import { gql } from '@apollo/client';
import { TinyItemFragment } from '../../queries/items/useTinyItems';

export const CreateFolder = gql`
    ${BaseFragment}
    ${FolderFragment}
    ${RecipeFragment}
    ${TinyItemFragment}
    mutation CreateFolder($data: CreateFolderInput!) {
        createFolder(data: $data) {
            ...FolderFragment
        }
    }
`;

export interface CreateFolderRes {
    createFolder: Folder;
}

export interface CreateFolderArgs {
    data: CreateFolderInput;
}

export const useFolderCreation = getMutationHook<
    CreateFolderRes,
    CreateFolderArgs
>(CreateFolder);
