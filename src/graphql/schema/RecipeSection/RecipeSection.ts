import { AppFragment } from './../../types';
import { Identified } from './../Base/Base';
import { RecipeStep, RecipeStepFragment } from '../RecipeStep/RecipeStep';
import { gql } from '@apollo/client';

export interface RecipeSection extends Identified {
    label: string | null;
    steps: RecipeStep[];
}

export const RecipeSectionFragment = new AppFragment(
    gql`
        fragment RecipeSectionFragment on RecipeSection {
            label
            steps {
                ...RecipeStepFragment
            }
        }
    `,
    [RecipeStepFragment]
);
