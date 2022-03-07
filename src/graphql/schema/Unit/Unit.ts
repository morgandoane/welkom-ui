import { AppFragment } from './../../types';
import { NamesFragment } from './../Names/Names';
import { gql } from '@apollo/client';
import { UnitClass } from '../../inputsTypes';
import { NamesPlural } from '../Names/Names';
import { Base, Identified, BaseFragment } from './../Base/Base';

export interface Unit extends Base {
    names: NamesPlural;
    unit_class: UnitClass;
    to_base_unit: number;
}

export interface TinyUnit extends Identified {
    names: NamesPlural;
    unit_class: UnitClass;
    to_base_unit: number;
}

export const UnitFragment = new AppFragment(
    gql`
        fragment UnitFragment on Unit {
            ...BaseFragment
            names {
                ...NamesFragment
            }
            unit_class
            to_base_unit
        }
    `,
    [BaseFragment, NamesFragment]
);

export const TinyUnitFragment = new AppFragment(
    gql`
        fragment TinyUnitFragment on Unit {
            _id
            names {
                ...NamesFragment
            }
            unit_class
            to_base_unit
        }
    `,
    [NamesFragment]
);
