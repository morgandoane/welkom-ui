import { getQueryHook } from './../../types';
import { gql } from '@apollo/client';
import {
    RecipeFolder,
    RecipeFolderFragment,
} from '../../schema/RecipeFolder/RecipeFolder';
import { TinyBaseFragment } from '../../schema/Base/Base';

export const FolderQuery = gql`
    ${TinyBaseFragment}
    ${RecipeFolderFragment}
    query FolderQuery($id: ObjectId) {
        recipefolder(id: $id) {
            ...RecipeFolderFragment
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
