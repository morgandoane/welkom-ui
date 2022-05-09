import { Ref } from '../../../types';
import { Fulfillment } from '../../Fulfillment/Fulfillment';
import { Lot } from '../../Lot/Lot';
import { RecipeStep } from '../../RecipeStep/RecipeStep';
import { Unit } from '../../Unit/Unit';

export interface BatchContentInput {
    recipe_step?: Ref<RecipeStep> | null;
    lot: Ref<Lot>;
    fulfillment?: Ref<Fulfillment> | null;
    client_unit: Ref<Unit>;
    client_qty: number;
    base_qty: number;
}
