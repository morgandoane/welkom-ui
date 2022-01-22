import { RecipeVersionFragment } from './../RecipeVersion/RecipeVersion';
import { gql } from '@apollo/client';
import { TinyProfile } from './../Profile/Profile';
import { Base } from './../Base/Base';
import { Location } from '../Location/Location';
import { MixingCardLine } from '../MixingCardLine/MixingCardLine';

export interface MixingCard extends Base {
    location: Location;
    profile: TinyProfile;
    lines: MixingCardLine[];
}

export const MixingCardFragment = gql`
    fragment MixingCardFragment on MixingCard {
        ...BaseFragment
        location {
            _id
            label
            address {
                city
            }
            company {
                _id
                name
            }
        }
        profile {
            user_id
            name
            email
            picture
            given_name
            family_name
        }
        lines {
            ...MixingCardLineFragment
        }
    }
`;
