import { AppFragment } from './../../types';
import { TinyLotFragment } from './../Lot/Lot';
import { TinyUnitFragment } from './../Unit/Unit';
import { gql } from '@apollo/client';
import { LotContent } from '../LotContent/LotContent';
import {
    QualityCheckResponse,
    QualityCheckResponseFragment,
} from '../QualityCheckResponse/QualityCheckResponse';

export interface FulfillmentContent extends LotContent {
    quality_check_responses: QualityCheckResponse[];
}

export const FulfillmentContentFragment = new AppFragment(
    gql`
        fragment FulfillmentContent on FulfillmentContent {
            lot {
                ...TinyLotFragment
            }
            quantity
            base_unit
            client_quantity
            client_unit {
                ...TinyUnitFragment
            }
            quality_check_responses {
                ...QualityCheckResponseFragment
            }
        }
    `,
    [TinyLotFragment, TinyUnitFragment, QualityCheckResponseFragment]
);
