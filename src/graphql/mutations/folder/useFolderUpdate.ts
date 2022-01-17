import { RecipeFragment } from './../../schema/Recipe/Recipe';
import { getMutationHook } from '../../types';
import { UpdateFolderInput } from '../../schema/Folder/FolderInput';
import { Folder, FolderFragment } from '../../schema/Folder/Folder';
import { gql } from '@apollo/client';
import { BaseFragment } from '../../fragments/BaseFragment';
import { TinyItemFragment } from '../../queries/items/useTinyItems';

export const UpdateFolder = gql`
    ${BaseFragment}
    ${FolderFragment}
    ${RecipeFragment}
    ${TinyItemFragment}
    mutation UpdateFolder($id: ObjectId!, $data: UpdateFolderInput!) {
        updateFolder(id: $id, data: $data) {
            ...FolderFragment
        }
    }
`;

export interface UpdateFolderRes {
    updateFolder: Folder;
}

export interface UpdateFolderArgs {
    id: string;
    data: UpdateFolderInput;
}

export const useFolderUpdation = getMutationHook<
    UpdateFolderRes,
    UpdateFolderArgs
>(UpdateFolder);
