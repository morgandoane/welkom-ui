import { gql } from '@apollo/client';
import { Ref } from '../../types';
import { TinyFulfillment } from '../Fulfillment/Fulfillment';
import { TinyLot } from '../Lot/Lot';
import { RecipeStep } from '../RecipeStep/RecipeStep';
import { TinyUnit } from '../Unit/Unit';

export interface BatchContent {
    recipe_step: Ref<RecipeStep> | null;
    lot: TinyLot;
    fulfillment: TinyFulfillment | null;
    client_unit: TinyUnit;
    client_qty: number;
    base_qty: number;
}

export const BatchContentFragment = gql`
    fragment BatchContentFragment on BatchContent {
        recipe_step
        lot {
            ...TinyLotFragment
        }
        fulfillment {
            ...TinyFulfillmentFragment
        }
        client_unit {
            ...TinyUnitFragment
        }
        client_qty
        base_qty
    }
`;
