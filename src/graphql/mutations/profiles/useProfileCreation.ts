import { UserRole } from './../../../auth/UserRole';
import { getMutationHook } from './../../types';
import { AppProfile } from './../../queries/profiles/AppProfile';
import { gql } from '@apollo/client';
import { ProfileFragment } from '../../queries/profiles/AppProfile';

export const CreateProfile = gql`
    ${ProfileFragment}
    mutation CreateProfile($data: CreateProfileInput!) {
        createProfile(data: $data) {
            ...ProfileFragment
        }
    }
`;

export interface CreateProfileInput {
    given_name: string;
    family_name: string;
    email?: string;
    username?: string;
    phone_number?: string;
    role: UserRole;
    temporary_password: string;
}

export interface CreateProfileRes {
    createProfile: AppProfile;
}

export interface CreateProfileArgs {
    data: CreateProfileInput;
}

export const useProfileCreation = getMutationHook<
    CreateProfileRes,
    CreateProfileArgs
>(CreateProfile);
