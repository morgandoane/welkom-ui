import { gql } from '@apollo/client';
import { SignedUrl } from './../SignedUrl/SignedUrl';
import { Profile } from '../Profile/Profile';

export interface AppFile {
    id: string;
    name: string;
    created_by?: Profile | null;
    date_created: Date;
    url: SignedUrl;
}

export const AppFileFragment = gql`
    fragment AppFileFragment on AppFile {
        id
        name
        date_created
        created_by {
            user_id
            email
            name
        }
        url {
            url
        }
    }
`;
