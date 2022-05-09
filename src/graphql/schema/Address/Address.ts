import { gql } from '@apollo/client';
import { Coordinate } from '../Coordinate/Coordinate';

export interface Address {
    line_1: string;
    line_2?: string | null;
    line_3?: string | null;
    city: string;
    postal: string;
    state: string;
    country: string;
    geolocation?: Coordinate | null;
}

export const AddressFragment = gql`
    fragment AddressFragment on Address {
        line_1
        line_2
        line_3
        city
        postal
        state
        country
        geolocation {
            type
            coordinates
        }
    }
`;
