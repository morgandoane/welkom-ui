import { gql } from '@apollo/client';
import { TinyProfile } from '../Profile/Profile';

export interface Comment {
    _id: string;
    created_by: TinyProfile;
    timestamp: Date;
    value: string;
}

export const CommentFragment = gql`
    fragment CommentFragment on Comment {
        _id
        created_by {
            ...TinyProfileFragment
        }
        timestamp
        value
    }
`;
