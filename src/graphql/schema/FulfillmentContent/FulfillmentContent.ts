import { AppFragment } from './../../types';
import { TinyLotFragment } from './../Lot/Lot';
import { TinyUnitFragment } from './../Unit/Unit';
import { gql } from '@apollo/client';
import { LotContent } from '../LotContent/LotContent';
import {
    PalletConfiguration,
    PalletConfigurationFragment,
} from '../PalletConfiguration/PalletConfiguration';
import {
    QualityCheckResponse,
    QualityCheckResponseFragment,
} from '../QualityCheckResponse/QualityCheckResponse';

export interface FulfillmentContent extends LotContent {
    pallet_configuration: PalletConfiguration;
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
            pallet_configuration {
                ...PalletConfigurationFragment
            }
            quality_check_responses {
                ...QualityCheckResponseFragment
            }
        }
    `,
    [
        TinyLotFragment,
        TinyUnitFragment,
        PalletConfigurationFragment,
        QualityCheckResponseFragment,
    ]
);
