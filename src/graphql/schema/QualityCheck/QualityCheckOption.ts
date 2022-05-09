import { gql } from '@apollo/client';

export interface QualityCheckOption {
    value: string;
    acceptable: boolean;
}

export interface QualityCheckOptionInput {
    value: string;
    acceptable: boolean;
}

export const QualityCheckOptionFragment = gql`
    fragment QualityCheckOptionFragment on QualityCheckOption {
        value
        acceptable
    }
`;
