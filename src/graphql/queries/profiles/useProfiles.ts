import { getQueryHook } from './../../types';
import { Pagination } from './../../schema/Pagination/Pagination';
import { AppProfile, ProfileFragment } from './AppProfile';
import { gql } from '@apollo/client';

export const ProfilesQuery = gql`
    ${ProfileFragment}
    query ProfilesQuery($filter: ProfileFilter!) {
        profiles(filter: $filter) {
            count
            items {
                ...ProfileFragment
            }
        }
    }
`;

export interface ProfileFilter {
    skip: number;
    take: number;
    name?: string;
}

export interface ProfilesRes {
    profiles: Pagination<AppProfile>;
}

export interface ProfilesArgs {
    filter: ProfileFilter;
}

export const useProfiles = getQueryHook<ProfilesRes, ProfilesArgs>(
    ProfilesQuery
);
