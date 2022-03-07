import { AppFragment } from './../../types';
import { TinyLot, TinyLotFragment } from './../Lot/Lot';
import { Identified } from './../Base/Base';
import { TinyUnit, TinyUnitFragment } from '../Unit/Unit';
import { BaseUnit } from '../../inputsTypes';
import { gql } from '@apollo/client';

export interface LotContent extends Identified {
    lot: TinyLot;
    quantity: number;
    base_unit: BaseUnit;
    client_quantity: number;
    client_unit: TinyUnit;
}

export const LotContentFragment = new AppFragment(
    gql`
        fragment LotContentFragment on LotContent {
            _id
            lot {
                ...TinyLotFragment
            }
            quantity
            base_unit
            client_quantity
            client_unit {
                ...TinyUnitFragment
            }
        }
    `,
    [TinyLotFragment, TinyUnitFragment]
);
