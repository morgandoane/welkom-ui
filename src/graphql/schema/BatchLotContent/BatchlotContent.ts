import { gql } from '@apollo/client';
import { LotContent } from '../LotContent/LotContent';
import { RecipeStep } from '../RecipeStep/RecipeStep';

export interface BatchlotContent extends LotContent {
    recipe_step: RecipeStep | null;
}
