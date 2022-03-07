import { AppFragment } from './../../types';
import {
    RecipeStepContent,
    RecipeStepContentFragment,
} from './../RecipeStepContent/RecipeStepContent';
import { Names, NamesFragment } from './../Names/Names';
import { Identified } from '../Base/Base';
import { gql } from '@apollo/client';

export interface RecipeStep extends Identified {
    instruction: Names | null;
    content: RecipeStepContent | null;
}

export const RecipeStepFragment = new AppFragment(
    gql`
        fragment RecipeStepFragment on RecipeStep {
            instruction {
                ...NamesFragment
            }
            content {
                ...RecipeStepContentFragment
            }
        }
    `,
    [NamesFragment, RecipeStepContentFragment]
);
