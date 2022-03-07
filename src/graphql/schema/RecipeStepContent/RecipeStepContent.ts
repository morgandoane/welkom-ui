import { AppFragment } from './../../types';
import { TinyUnit, TinyUnitFragment } from './../Unit/Unit';
import { TinyItem, ItemFragment } from './../Item/Item';
import { Identified } from './../Base/Base';
import { gql } from '@apollo/client';

export interface RecipeStepContent extends Identified {
    items: TinyItem[];
    quantity: number;
    client_quantity: number;
    client_unit: TinyUnit;
}

export const RecipeStepContentFragment = new AppFragment(
    gql`
        fragment RecipeStepContentFragment on RecipeStepContent {
            items {
                ...ItemFragment
            }
            quantity
            client_quantity
            client_unit {
                ...TinyUnitFragment
            }
        }
    `,
    [ItemFragment, TinyUnitFragment]
);
