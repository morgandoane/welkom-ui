import { gql } from '@apollo/client';
import { TinyRecipe } from '../../queries/recipe/useTinyRecipe';
import { TinyBase } from '../Base/Base';

export interface RecipeFolder extends TinyBase {
    parent: RecipeFolderAncestor | null;
    label: string;
    folders: RecipeFolderAncestor[];
    recipes: TinyRecipe[];
}

export interface RecipeFolderAncestor {
    _id: string;
    label: string;
}

export const RecipeFolderFragment = gql`
    fragment RecipeFolderFragment on RecipeFolder {
        ...TinyBaseFragment
        parent {
            _id
            label
        }
        label
        folders {
            _id
            label
        }
        recipes {
            ...TinyRecipeFragment
        }
    }
`;
