import { gql } from '@apollo/client';
import { TinyProfile } from '../Profile/Profile';
import { VerificationState } from './VerificationState';

export interface Verification {
    verified_by: TinyProfile;
    state: VerificationState;
    note?: string;
}

export const VerificationFragment = gql`
    fragment VerificationFragment on Verification {
        verified_by {
            ...TinyProfileFragment
        }
        state
        note
    }
`;
