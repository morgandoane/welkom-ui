import { gql } from '@apollo/client';
import { Recipe } from '../../../Recipe/Recipe';
import { Folder } from '../../Folder';

export interface RecipeFolder extends Folder {
    recipes?: Recipe[];
}

export const RecipeFolderFragment = gql`
    fragment RecipeFolderFragment on RecipeFolder {
        ...BaseFragment
        name
        parent {
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
