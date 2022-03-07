import { AppFragment } from './../../../types';
import { gql } from '@apollo/client';

export interface NumberRange {
    min: number;
    max: number;
}

export const NumberRangeFragment = new AppFragment(
    gql`
        fragment NumberRangeFragment on NumberRange {
            min
            max
        }
    `,
    []
);
