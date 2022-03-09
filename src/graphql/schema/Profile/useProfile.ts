import { Profile, ProfileFragment } from './Profile';
import { getAtomicQueryHook } from '../../types';
import { gql } from '@apollo/client';

export const ProfileQuery = gql`
    ${ProfileFragment._document}
    query ProfileQuery($id: String!) {
        profile(id: $id) {
            ...ProfileFragment
        }
    }
`;

export const useProfile =
    getAtomicQueryHook<{ profile: Profile }>(ProfileQuery);
