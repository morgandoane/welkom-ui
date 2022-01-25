import { gql } from '@apollo/client';

export interface ProductionLine {
    _id: string;
    name: string;
    location: {
        _id: string;
        company: {
            _id: string;
        };
    };
}

export const ProductionLineFragment = gql`
    fragment ProductionLineFragment on ProductionLine {
        _id
        name
        location {
            _id
            company {
                _id
            }
        }
    }
`;
