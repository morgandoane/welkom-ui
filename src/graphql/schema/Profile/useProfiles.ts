import { ProfileFilter } from '../../inputsTypes';
import { Pagination } from '../../../utils/types/Pagination';
import { getFilterQueryHook } from '../../types';
import { TinyProfile, TinyProfileFragment } from './Profile';
import { gql } from '@apollo/client';

export const ProfilesQuery = gql`
    ${TinyProfileFragment._document}
    query ProfilesQuery($filter: ProfileFilter!) {
        profiles(filter: $filter) {
            count
            items {
                ...TinyProfileFragment
            }
        }
    }
`;

export const useProfiles = getFilterQueryHook<
    { profiles: Pagination<TinyProfile> },
    { filter: ProfileFilter }
>(ProfilesQuery);
