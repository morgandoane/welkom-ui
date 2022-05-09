import { gql } from '@apollo/client';
import { TinyProfile } from '../Profile/Profile';

export interface Deletion {
    deleted_by: TinyProfile;
    timestamp: Date;
    comment?: string;
}

export const DeletionFragment = gql`
    fragment DeletionFragment on Deletion {
        deleted_by {
            ...TinyProfileFragment
        }
        timestamp
        comment
    }
`;
