import { Recipe, RecipeFragment } from './../Recipe/Recipe';
import { gql } from '@apollo/client';
import { RecipeVersion } from '../RecipeVersion/RecipeVersion';

export interface MixingCardLine {
    _id: string;
    recipe: Recipe;
    recipe_version: RecipeVersion | null;
    limit?: number | null;
}

export const MixingCardLineFragment = gql`
    fragment MixingCardLineFragment on MixingCardLine {
        _id
        recipe_version {
            ...RecipeVersionFragment
        }
        recipe {
            ...RecipeFragment
        }
        limit
    }
`;
