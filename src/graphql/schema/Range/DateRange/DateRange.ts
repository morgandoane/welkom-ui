import { AppFragment } from './../../../types';
import { gql } from '@apollo/client';

export interface DateRange {
    start: Date;
    end: Date;
}

export const DateRangeFragment = new AppFragment(
    gql`
        fragment DateRangeFragment on DateRange {
            start
            end
        }
    `,
    []
);
