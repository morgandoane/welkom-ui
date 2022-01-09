import { gql } from '@apollo/client';

export const AddressFragment = gql`
    fragment AddressFragment on Address {
        line_1
        line_2
        city
        state
        country
        postal
        coordinate {
            lat
            lon
        }
    }
`;
