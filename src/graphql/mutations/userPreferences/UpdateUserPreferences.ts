import { UserMetaData } from './../../../auth/User';
import { getMutationHook } from './../../types';
import { gql } from '@apollo/client';

export const UpdateUserPreferences = gql`
    mutation UpdateUserPreferences($data: UserMetaDataInput!) {
        updateUserPreferences(data: $data) {
            prefers_dark_mode
            phone_number
        }
    }
`;

export interface UpdateUserPreferencesRes {
    updateUserPreferences: UserMetaData;
}

export interface UpdateUserPreferencesArgs {
    data: {
        prefers_dark_mode?: boolean;
        phone_number?: string;
    };
}

export const useUserPreferenceUpdate = getMutationHook<
    UpdateUserPreferencesRes,
    UpdateUserPreferencesArgs
>(UpdateUserPreferences);
