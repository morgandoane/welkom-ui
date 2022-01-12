import { UserRole } from './../../../auth/UserRole';
import { getMutationHook } from '../../types';
import { AppProfile } from '../../queries/profiles/AppProfile';
import { gql } from '@apollo/client';
import { ProfileFragment } from '../../queries/profiles/AppProfile';

export const UpdateProfile = gql`
    ${ProfileFragment}
    mutation UpdateProfile($id: String!, $data: UpdateProfileInput!) {
        updateProfile(id: $id, data: $data) {
            ...ProfileFragment
        }
    }
`;

export interface UpdateProfileInput {
    given_name?: string;
    family_name?: string;
    email?: string;
    role?: UserRole;
    phone_number?: string;
    password?: string;
}

export interface UpdateProfileRes {
    updateProfile: AppProfile;
}

export interface UpdateProfileArgs {
    id: string;
    data: UpdateProfileInput;
}

export const useProfileUpdate = getMutationHook<
    UpdateProfileRes,
    UpdateProfileArgs
>(UpdateProfile);
