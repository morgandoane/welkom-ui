import { AppFragment } from './../../../../types';
import { gql } from '@apollo/client';
import { Item, ItemFragment, TinyItem } from './../../Item';
import { IngredientUnitClass } from '../../../../inputsTypes';

export interface Ingredient extends Item {
    unit_class: IngredientUnitClass;
}
export interface TinyIngredient extends TinyItem {
    unit_class: IngredientUnitClass;
}

export const TinyIngredientFragment = new AppFragment(
    gql`
        fragment TinyIngredientFragment on Ingredient {
            ...ItemFragment
            unit_class
        }
    `,
    [ItemFragment]
);

export const IngredientFragment = new AppFragment(
    gql`
        fragment IngredientFragment on Ingredient {
            ...ItemFragment
            unit_class
        }
    `,
    [ItemFragment]
);
