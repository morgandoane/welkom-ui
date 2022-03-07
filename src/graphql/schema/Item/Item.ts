import { IngredientUnitClass } from './../../inputsTypes';
import { createItemFragment } from './../../unionHandling/ItemUnion';
import { AppFragment } from './../../types';
import { Identified } from './../Base/Base';
import {
    UploadEnabled,
    UploadEnabledFragment,
} from './../UploadEnabled/UploadEnabled';
import {
    PalletConfiguration,
    PalletConfigurationFragment,
} from './../PalletConfiguration/PalletConfiguration';
import { Names, NamesFragment } from './../Names/Names';
import { BaseUnit } from '../../inputsTypes';
import { gql } from '@apollo/client';
import { TinyProfileFragment } from '../Profile/Profile';

export interface Item extends UploadEnabled {
    names: Names;
    base_unit: BaseUnit;
    per_base_unit: number;
    pallet_configurations: PalletConfiguration[];
}

export interface TinyItem extends Identified {
    names: Names;
    base_unit: BaseUnit;
    per_base_unit: number;
    pallet_configurations: PalletConfiguration[];
}

export const ItemFragment = new AppFragment(
    gql(String.raw`
        fragment ItemFragment on ItemUnion {
        ${createItemFragment()}
        }
`),
    [TinyProfileFragment, PalletConfigurationFragment]
);
