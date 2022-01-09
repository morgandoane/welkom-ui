import { getQueryHook } from './../../types';
import { Pagination } from './../../schema/Pagination/Pagination';
import { AppProfile, ProfileFragment } from './AppProfile';
import { gql } from '@apollo/client';

export const ProfileQuery = gql`
    ${ProfileFragment}
    query ProfileQuery($id: String!) {
        profile(id: $id) {
            ...ProfileFragment
        }
    }
`;

export interface ProfileRes {
    profile: AppProfile;
}

export interface ProfileArgs {
    id: string;
}

export const useProfile = getQueryHook<ProfileRes, ProfileArgs>(ProfileQuery);
