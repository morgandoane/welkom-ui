import { Deletion } from '../Deletion/Deletion';
import { TinyProfile } from '../Profile/Profile';
import { Comment } from '../Comment/Comment';
import { AppFile } from '../AppFile/AppFile';
import { Certification } from '../Certification/Certification';
import { Verification } from '../Verification/Verification';
import { gql } from '@apollo/client';

export interface TinyBase {
    _id: string;
    timestamp: Date;
}

export interface Base extends TinyBase {
    created_by: TinyProfile;
    deletion: Deletion | null;
    files: AppFile[];
    photo?: string | null;
    certifications: Certification[];
    comments: Comment[];
    verification?: Verification | null;
}

export const BaseFragment = gql`
    fragment BaseFragment on Base {
        _id
        timestamp
        created_by {
            ...TinyProfileFragment
        }
        deletion {
            ...DeletionFragment
        }
        files {
            ...AppFileFragment
        }
        photo
        certifications {
            ...CertificationFragment
        }
        comments {
            ...CommentFragment
        }
        verification {
            ...VerificationFragment
        }
    }
`;

export const TinyBaseFragment = gql`
    fragment TinyBaseFragment on Base {
        _id
        timestamp
    }
`;
