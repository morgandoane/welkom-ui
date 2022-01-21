import { getQueryHook } from './../../types';
import { BaseFragment } from './../../fragments/BaseFragment';
import { AppProfile, ProfileFragment } from './../profiles/AppProfile';
import { ProfileIdentifier } from './../../schema/ProfileIdentifier/ProfileIdentifier';
import { gql } from '@apollo/client';

export interface ManagedProfile extends AppProfile {
    identifier: ProfileIdentifier | null;
}

export const ManagedProfile = gql`
    ${ProfileFragment}
    ${BaseFragment}
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
    profile: ManagedProfile;
}

export const useManagedProfile = getQueryHook<
    ManagedProfileRes,
    ManagedProfileArgs
>(ManagedProfile);
