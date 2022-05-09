import { gql } from '@apollo/client';
import { AppFile } from '../AppFile/AppFile';
import { TinyCompany } from '../Company/Company';
import { TinyProfile } from '../Profile/Profile';

export interface ItineraryDocumentation {
    carrier: TinyCompany;
    code: string;
    uploaded_by: TinyProfile;
    files: AppFile[];
}

export const ItineraryDocumentationFragment = gql`
    fragment ItineraryDocumentationFragment on ItineraryDocumentation {
        carrier {
            ...TinyCompanyFragment
        }
        code
        uploaded_by {
            ...TinyProfileFragment
        }
        files {
            ...AppFileFragment
        }
    }
`;
