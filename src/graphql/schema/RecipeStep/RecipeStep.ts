import { gql } from '@apollo/client';
import { TinyItem } from '../Item/Item';
import { TinyUnit } from '../Unit/Unit';
import { RecipeStepType } from './RecipeStepType';

export interface IngredientStep {
    _id: string;
    type: RecipeStepType.Ingredient;
    items: TinyItem[];
    client_unit: TinyUnit;
    client_qty: number;
    base_qty: number;
}

export interface InstructionStep {
    _id: string;
    type: RecipeStepType.Instruction;
    english: string;
    spanish: string;
}

export type RecipeStep = IngredientStep | InstructionStep;

export const RecipeStepFragment = gql`
    fragment RecipeStepFragment on RecipeStep {
        _id
        type
        items {
            ...TinyItemFragment
        }
        client_unit {
            ...TinyUnitFragment
        }
        client_qty
        base_qty
        english
        spanish
    }
`;
