import { StorageBucket } from './../../schema/SignedUrl/SignedUrl';
import {
    gql,
    MutationHookOptions,
    MutationTuple,
    useMutation,
} from '@apollo/client';
import { AppFileFragment } from './../../schema/AppFile/AppFile';

export interface FileDeletionArgs {
    category: StorageBucket;
    folder: string;
    name: string;
}

export interface FileDeletionRes {
    deleteFile: boolean;
}

export const DeleteFile = gql`
    mutation DeleteFile(
        $category: StorageBucketProxy!
        $folder: String!
        $name: String!
    ) {
        deleteFile(category: $category, folder: $folder, name: $name)
    }
`;

export const useFileDeletion = (
    options?: MutationHookOptions<FileDeletionRes, FileDeletionArgs>
): MutationTuple<FileDeletionRes, FileDeletionArgs> =>
    useMutation(DeleteFile, options);
