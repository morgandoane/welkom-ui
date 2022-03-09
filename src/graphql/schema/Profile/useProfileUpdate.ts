import { UpdateProfileInput } from '../../inputsTypes';
import { Profile, ProfileFragment } from './Profile';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';

export const UpdateProfileMutation = gql`
    ${ProfileFragment._document}
    mutation UpdateProfileMutation($id: String!, $data: UpdateProfileInput!) {
        updateProfile(id: $id, data: $data) {
            ...ProfileFragment
        }
    }
`;

export const useProfileUpdate = getMutationHook<
    { updateProfile: Profile },
    { id: string; data: UpdateProfileInput }
>(UpdateProfileMutation);
