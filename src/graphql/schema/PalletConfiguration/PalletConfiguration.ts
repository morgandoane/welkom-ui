import { AppFragment } from './../../types';
import { gql } from '@apollo/client';

export interface PalletConfiguration {
    capacity: number;
    name: string;
}

export const PalletConfigurationFragment = new AppFragment(
    gql`
        fragment PalletConfigurationFragment on PalletConfiguration {
            capacity
            name
        }
    `,
    []
);
