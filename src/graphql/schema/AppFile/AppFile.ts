import { gql } from '@apollo/client';
import { TinyProfile } from '../Profile/Profile';

export interface AppFile {
    id: string;
    parent: string;
    url: string;
    display_name: string;
    name: string;
    created_by: TinyProfile;
    date_created: Date;
}

export const AppFileFragment = gql`
    fragment AppFileFragment on AppFile {
        id
        parent
        url
        display_name
        name
        created_by {
            ...TinyProfileFragment
        }
        date_created
    }
`;
