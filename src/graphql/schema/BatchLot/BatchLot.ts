import { ItemFragment } from './../Item/Item';
import { AppFragment } from './../../types';
import { gql } from '@apollo/client';
import { BatchlotContent } from './../BatchLotContent/BatchlotContent';
import { Lot, TinyLot } from './../Lot/Lot';
import { TinyCompanyFragment } from '../Company/Company';

export interface BatchLot extends Lot {
    contents: BatchlotContent[];
}

export interface TinyBatchLot extends TinyLot {
    contents: BatchlotContent[];
}

export const TinyBatchLotFragment = new AppFragment(
    gql`
        fragment TinyBatchLotFragment on BatchLot {
            _id
            code
            item {
                ...ItemFragment
            }
            company {
                ...TinyCompanyFragment
            }
            contents {
                recipe_step {
                    _id
                }
            }
        }
    `,
    [ItemFragment, TinyCompanyFragment]
);
