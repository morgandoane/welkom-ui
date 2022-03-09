import { CreateProfileInput } from '../../inputsTypes';
import { Profile, ProfileFragment } from './Profile';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';

export const CreateProfileMutation = gql`
    ${ProfileFragment._document}
    mutation CreateProfileMutation($data: CreateProfileInput!) {
        createProfile(data: $data) {
            ...ProfileFragment
        }
    }
`;

export const useProfileCreation = getMutationHook<
    { createProfile: Profile },
    { data: CreateProfileInput }
>(CreateProfileMutation);
