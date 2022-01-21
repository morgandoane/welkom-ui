import { ProfileIdentifierInput } from './../../schema/ProfileIdentifier/ProfileIdentifierInputs';
import { ProfileIdentifier } from './../../schema/ProfileIdentifier/ProfileIdentifier';
import { BaseFragment } from './../../fragments/BaseFragment';
import { gql } from '@apollo/client';
import { getMutationHook } from './../../types';

export const CreateProfileIdentifier = gql`
    ${BaseFragment}
    mutation CreateProfileIdentifier($data: ProfileIdentifierInput!) {
        createProfileIdentifier(data: $data) {
            ...BaseFragment
            code
        }
    }
`;

export interface CreateProfileIdentifierRes {
    createProfileIdentifier: ProfileIdentifier;
}

export interface CreateProfileIdentifierArgs {
    data: ProfileIdentifierInput;
}

export const useProfileIdentifierCreation = getMutationHook<
    CreateProfileIdentifierRes,
    CreateProfileIdentifierArgs
>(CreateProfileIdentifier);
