import { gql } from '@apollo/client';
import { Base, TinyBase } from '../Base/Base';
import { TinyItem } from '../Item/Item';
import { RecipeFolder } from '../RecipeFolder/RecipeFolder';

export interface Recipe extends Base {
    item: TinyItem;
    folder: RecipeFolder;
    label: string;
}

export interface TinyRecipe extends TinyBase {
    item: TinyItem;
    folder: RecipeFolder;
    label: string;
}

export const RecipeFragment = gql`
    fragment RecipeFragment on Recipe {
        ...BaseFragment
        item {
            ...TinyItemFragment
        }
        folder {
            ...TinyRecipeFolderFragment
        }
        label
    }
`;

export const TinyRecipeFragment = gql`
    fragment TinyRecipeFragment on Recipe {
        ...TinyBaseFragment
        item {
            ...TinyItemFragment
        }
        folder {
            ...TinyRecipeFolderFragment
        }
        label
    }
`;
