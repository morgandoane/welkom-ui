import { gql } from '@apollo/client';

export interface Coordinate {
    type: 'Point';
    coordinates: number[];
}

export const CoordinateFragment = gql`
    fragment CoordinateFragment on Coordinate {
        type
        coordinates
    }
`;
