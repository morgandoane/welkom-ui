import { AppFragment } from './../../types';
import { TinyUnitFragment } from './../Unit/Unit';
import { TinyItem, ItemFragment } from './../Item/Item';
import {
    PalletConfiguration,
    PalletConfigurationFragment,
} from '../PalletConfiguration/PalletConfiguration';
import { Unit } from '../Unit/Unit';
import { gql } from '@apollo/client';

export interface BolContent {
    item: TinyItem;
    quantity: number;
    client_quantity: number;
    client_unit: Unit;
    pallet_configuration: PalletConfiguration;
}

export const BolContentFragment = new AppFragment(
    gql`
        fragment BolContentFragment on BolContent {
            item {
                ...ItemFragment
            }
            quantity
            client_quantity
            client_unit {
                ...TinyUnitFragment
            }
            pallet_configuration {
                ...PalletConfigurationFragment
            }
        }
    `,
    [ItemFragment, TinyUnitFragment, PalletConfigurationFragment]
);
