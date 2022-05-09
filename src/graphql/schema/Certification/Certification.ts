import { gql } from '@apollo/client';

export interface Certification {
    name: string;
    date: Date;
}

export const CertificationFragment = gql`
    fragment CertificationFragment on Certification {
        name
        date
    }
`;
