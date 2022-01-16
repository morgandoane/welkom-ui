import { TinyProfile } from './../Profile/Profile';
import { gql } from '@apollo/client';

export interface FolderRecipe {
    _id: string;
    name: string;
    date_created: Date;
    created_by: TinyProfile;
}

export const FolderFragment = gql`
    fragment FolderFragment on Folder {
        _id
        name
        date_created
        created_by {
            user_id
            name
            email
            given_name
            family_name
            picture
        }
    }
`;
