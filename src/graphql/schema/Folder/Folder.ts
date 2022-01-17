import { Recipe } from './../Recipe/Recipe';
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
    recipes: Recipe[];
    ancestry: FolderChild[];
}

export interface TinyFolder {
    _id: string;
    class: FolderClass;
    name: string;
}

export const TinyFolderFragment = gql`
    fragment TinyFolderFragment on Folder {
        _id
        class
        name
    }
`;

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
            ...RecipeFragment
        }
    }
`;
