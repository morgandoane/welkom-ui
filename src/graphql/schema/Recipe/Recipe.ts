import { UploadEnabledFragment } from './../UploadEnabled/UploadEnabled';
import { AppFragment } from './../../types';
import { Identified } from './../Base/Base';
import { TinyItem, ItemFragment } from './../Item/Item';
import { TinyFolder } from './../Folder/Folder';
import { UploadEnabled } from '../UploadEnabled/UploadEnabled';
import { gql } from '@apollo/client';

export interface Recipe extends UploadEnabled {
    name: string;
    item: TinyItem;
    folder: TinyFolder | null;
}

export interface TinyRecipe extends Identified {
    name: string;
    item: TinyItem;
}

export const TinyRecipeFragment = new AppFragment(
    gql`
        fragment TinyRecipeFragment on Recipe {
            _id
            name
            item {
                ...ItemFragment
            }
        }
    `,
    [ItemFragment]
);

export const RecipeFragment = new AppFragment(
    gql`
        fragment RecipeFragment on Recipe {
            ...UploadEnabledFragment
            name
            item {
                ...ItemFragment
            }
        }
    `,
    [UploadEnabledFragment, ItemFragment]
);
