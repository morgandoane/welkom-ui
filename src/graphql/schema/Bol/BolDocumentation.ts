import { gql } from '@apollo/client';
import { AppFile } from '../AppFile/AppFile';
import { TinyProfile } from '../Profile/Profile';

export interface BolDocumentation {
    code: string;
    uploaded_by: TinyProfile;
    files: AppFile[];
}

export const BolDocumentationFragment = gql`
    fragment BolDocumentationFragment on BolDocumentation {
        code
        uploaded_by {
            ...TinyProfileFragment
        }
        files {
            ...AppFileFragment
        }
    }
`;
