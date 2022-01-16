import { FolderFragment } from './../Folder/Folder';
import { gql } from '@apollo/client';
import { TinyItem } from './../Item/Item';
import { Base } from '../Base/Base';
import { Folder } from '../Folder/Folder';
import { Item } from '../Item/Item';

export interface Recipe extends Base {
    name: string;
    item: Item;
    folder?: Folder;
}

export interface TinyRecipe {
    _id: string;
    name: string;
    item: TinyItem;
    folder?: Folder | null;
}

export const TinyRecipeFragment = gql`
    fragment TinyRecipeFragment on Recipe {
        _id
        name
        item {
            _id
        }
    }
`;
