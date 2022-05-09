import { gql } from '@apollo/client';
import { RecipeStep } from '../RecipeStep/RecipeStep';

export interface RecipeSection {
    label: string | null;
    steps: RecipeStep[];
}

export const RecipeSectionFragment = gql`
    fragment RecipeSectionFragment on RecipeSection {
        label
        steps {
            ...RecipeStepFragment
        }
    }
`;
