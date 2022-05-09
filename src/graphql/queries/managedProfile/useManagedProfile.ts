import { getQueryHook } from './../../types';
import { ProfileFragment } from './../profiles/AppProfile';
import { gql } from '@apollo/client';
import { Profile } from '../../schema/Profile/Profile';

export const ManagedProfile = gql`
    ${ProfileFragment}
    query ManagedProfile($id: String!) {
        profile(id: $id) {
            ...ProfileFragment
            identifier {
                code
                ...BaseFragment
            }
        }
    }
`;

export interface ManagedProfileArgs {
    id: string;
}

export interface ManagedProfileRes {
    profile: Profile;
}

export const useManagedProfile = getQueryHook<
    ManagedProfileRes,
    ManagedProfileArgs
>(ManagedProfile);
