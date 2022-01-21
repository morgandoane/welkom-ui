import { TinyProfile } from './../Profile/Profile';
import { gql } from '@apollo/client';

export const TinyRecipeVersionFragment = gql`
    fragment TinyRecipeVersionFragment on RecipeVersion {
        _id
        date_created
        created_by {
            user_id
            email
            name
            picture
            given_name
            family_name
        }
        note
    }
`;

export interface TionyRecipeVersion {
    _id: string;
    date_created: Date;
    created_by: TinyProfile;
    note?: string | null;
}
