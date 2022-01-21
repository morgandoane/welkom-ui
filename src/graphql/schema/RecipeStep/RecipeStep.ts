import { gql } from '@apollo/client';
import { ItemPluralContent } from './../Content/Content';

export interface RecipeSection {
    _id: string;
    label?: string;
    steps: RecipeStep[];
}

export interface RecipeStep {
    _id: string;
    instruction?: string;
    content?: ItemPluralContent;
}

export const RecipeStepFragment = gql`
    fragment RecipeStepFragment on RecipeStep {
        _id
        instruction
        content {
            quantity
            unit {
                ...TinyUnitFragment
            }
            items {
                ...TinyItemFragment
            }
        }
    }
`;

export const RecipeSectionFragment = gql`
    fragment RecipeSectionFragment on RecipeSection {
        _id
        label
        steps {
            ...RecipeStepFragment
        }
    }
`;
