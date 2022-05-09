import { gql } from '@apollo/client';
import { Base, TinyBase } from '../Base/Base';
import { UnitClass } from './UnitClass';

export interface Unit extends Base {
    class: UnitClass;
    class_per_unit: number;
    english: string;
    spanish: string;
    english_plural: string;
    spanish_plural: string;
}

export interface TinyUnit extends TinyBase {
    class: UnitClass;
    class_per_unit: number;
    english: string;
    spanish: string;
    english_plural: string;
    spanish_plural: string;
}

export const UnitFragment = gql`
    fragment UnitFragment on Unit {
        ...BaseFragment
        class
        class_per_unit
        english
        spanish
        english_plural
        spanish_plural
    }
`;

export const TinyUnitFragment = gql`
    fragment TinyUnitFragment on Unit {
        ...TinyBaseFragment
        class
        class_per_unit
        english
        spanish
        english_plural
        spanish_plural
    }
`;
