import { gql } from '@apollo/client';
import { Base, TinyBase } from '../Base/Base';
import { UnitClass } from '../Unit/UnitClass';

export interface Item extends Base {
    tags: string[];
    identifier?: string;
    english: string;
    spanish: string;
    unit_class: UnitClass;
    conversion: number;
}

export interface TinyItem extends TinyBase {
    tags: string[];
    identifier?: string;
    english: string;
    spanish: string;
    unit_class: UnitClass;
    conversion: number;
}

export const ItemFragment = gql`
    fragment ItemFragment on Item {
        ...BaseFragment
        tags
        identifier
        english
        spanish
        unit_class
        conversion
    }
`;

export const TinyItemFragment = gql`
    fragment TinyItemFragment on Item {
        ...TinyBaseFragment
        tags
        identifier
        english
        spanish
        unit_class
        conversion
    }
`;
