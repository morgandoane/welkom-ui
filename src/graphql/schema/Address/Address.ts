import { AppFragment } from './../../types';
import { gql } from '@apollo/client';

export interface Address {
    line_1: string;
    line_2?: string;
    city: string;
    state: string;
    postal: string;
    country?: string | null;
}

export const AddressFragment = new AppFragment(
    gql`
        fragment AddressFragment on Address {
            line_1
            line_2
            city
            state
            postal
            country
        }
    `,
    []
);
