import { AppFragment } from './../../types';
import { Identified, BaseFragment } from './../Base/Base';
import {
    RecipeSection,
    RecipeSectionFragment,
} from '../RecipeSection/RecipeSection';
import { Recipe, TinyRecipeFragment } from '../Recipe/Recipe';
import { Base } from '../Base/Base';
import { gql } from '@apollo/client';

export interface RecipeVersion extends Base {
    recipe: Recipe;
    sections: RecipeSection[];
    parameters: string[];
}

export interface TinyRecipeVersion extends Identified {
    recipe: Recipe;
    sections: RecipeSection[];
    parameters: string[];
}

export const TinyRecipeVersionFragment = new AppFragment(
    gql`
        fragment TinyRecipeVersionFragment on RecipeVersion {
            _id
            recipe {
                ...TinyRecipeFragment
            }
            sections {
                ...RecipeSectionFragment
            }
            parameters
        }
    `,
    [TinyRecipeFragment, RecipeSectionFragment]
);

export const RecipeVersionFragment = new AppFragment(
    gql`
        fragment RecipeVersionFragment on RecipeVersion {
            ...BaseFragment
            recipe {
                ...TinyRecipeFragment
            }
            sections {
                ...RecipeSectionFragment
            }
            parameters
        }
    `,
    [BaseFragment, TinyRecipeFragment, RecipeSectionFragment]
);
