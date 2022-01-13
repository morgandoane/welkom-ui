import { gql } from '@apollo/client';
import { Recipe } from '../../../Recipe/Recipe';
import { Folder } from '../../Folder';

export interface RecipeAncestor {
    _id: string;
    name: string;
}

export interface RecipeFolder extends Folder {
    recipes?: Recipe[];
    ancestry: RecipeAncestor[];
}

export const RecipeFolderFragment = gql`
    fragment RecipeFolderFragment on RecipeFolder {
        ...BaseFragment
        name
        ancestry {
            _id
            name
        }
        folders {
            _id
            name
        }
        recipes {
            ...TinyRecipeFragment
        }
    }
`;
