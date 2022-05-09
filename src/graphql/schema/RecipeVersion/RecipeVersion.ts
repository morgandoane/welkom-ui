import { gql } from '@apollo/client';
import { TinyRecipe } from '../../queries/recipe/useTinyRecipe';
import { Base, TinyBase } from '../Base/Base';
import { RecipeSection } from '../RecipeSection/RecipeSection';

export interface RecipeVersion extends Base {
    recipe: TinyRecipe;
    sections: RecipeSection[];
    parameters: string[];
    base_qty: number;
}

export interface TinyRecipeVersion extends TinyBase {
    recipe: TinyRecipe;
    sections: RecipeSection[];
    parameters: string[];
    base_qty: number;
}

export const RecipeVersionFragment = gql`
    fragment RecipeVersionFragment on RecipeVersion {
        ...BaseFragment
        recipe {
            ...TinyRecipeFragment
        }
        sections {
            ...RecipeSectionFragment
        }
        parameters
        base_qty
    }
`;

export const TinyRecipeVersionFragment = gql`
    fragment TinyRecipeVersionFragment on RecipeVersion {
        ...TinyBaseFragment
        recipe {
            ...TinyRecipeFragment
        }
        sections {
            ...RecipeSectionFragment
        }
        parameters
        base_qty
    }
`;
