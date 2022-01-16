import { TinyRecipeFragment } from './../Recipe/Recipe';
import { FolderRecipe } from './../Recipe/FolderRecipe';
import { gql } from '@apollo/client';
import { Base } from '../Base/Base';

export enum FolderClass {
    Recipe = 'Recipe',
}

export interface FolderChild {
    _id: string;
    name: string;
}

export interface Folder extends Base {
    class: FolderClass;
    name: string;
    parent: FolderChild | null;
    folders: FolderChild[];
    recipes: FolderRecipe[];
    ancestry: FolderRecipe[];
}

export const FolderFragment = gql`
    fragment FolderFragment on Folder {
        ...BaseFragment
        name
        class
        parent {
            _id
            name
        }
        folders {
            _id
            name
        }
        ancestry {
            _id
            name
        }
        recipes {
            ...TinyRecipeFragment
        }
    }
`;
