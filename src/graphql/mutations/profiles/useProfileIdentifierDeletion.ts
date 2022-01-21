import { ProfileIdentifierInput } from '../../schema/ProfileIdentifier/ProfileIdentifierInputs';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';

export const DeleteProfileIdentifier = gql`
    mutation DeleteProfileIdentifier($profile: String!) {
        deleteProfileIdentifier(user_id: $profile)
    }
`;

export interface DeleteProfileIdentifierRes {
    deleteProfileIdentifier: boolean;
}

export interface DeleteProfileIdentifierArgs {
    profile: string;
}

export const useProfileIdentifierDeletion = getMutationHook<
    DeleteProfileIdentifierRes,
    DeleteProfileIdentifierArgs
>(DeleteProfileIdentifier);
