import { IngredientUnitClass } from './../../inputsTypes';
import { createItemFragment } from './../../unionHandling/ItemUnion';
import { AppFragment } from './../../types';
import { Identified } from './../Base/Base';
import { UploadEnabled } from './../UploadEnabled/UploadEnabled';
import { Names } from './../Names/Names';
import { BaseUnit } from '../../inputsTypes';
import { gql } from '@apollo/client';
import { TinyProfileFragment } from '../Profile/Profile';

export interface Item extends UploadEnabled {
    names: Names;
    base_unit: BaseUnit;
    per_base_unit: number;
}

export interface TinyItem extends Identified {
    names: Names;
    base_unit: BaseUnit;
    per_base_unit: number;
}

export const ItemFragment = new AppFragment(
    gql(String.raw`
        fragment ItemFragment on ItemUnion {
        ${createItemFragment()}
        }
`),
    [TinyProfileFragment]
);

export const TinyItemFragment = new AppFragment(
    gql`
        fragment TinyItemFragment on Item {
            _id
            names {
                english
                spanish
            }
            base_unit
            per_base_unit
        }
    `,
    []
);
