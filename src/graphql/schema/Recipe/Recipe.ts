import { gql } from '@apollo/client';
import { TinyItem } from './../Item/Item';
import { Base } from '../Base/Base';
import { Folder } from '../Folder/Folder';

export interface Recipe extends Base {
    name: string;
    item: TinyItem;
    folder?: Folder;
}

export const RecipeFragment = gql`
    fragment RecipeFragment on Recipe {
        ...BaseFragment
        name
        item {
            ...TinyItemFragment
        }
        folder {
            name
        }
    }
`;
