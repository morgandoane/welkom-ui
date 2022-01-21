import { RecipeSection } from './../RecipeStep/RecipeStep';
import { gql } from '@apollo/client';
import { TinyItem } from './../Item/Item';
import { Base } from '../Base/Base';
import { Folder } from '../Folder/Folder';
import { DateGroup } from '../DateGroup/DateGroup';

export interface Recipe extends Base {
    name: string;
    item: TinyItem;
    folder?: Folder;
    version_date_groups: DateGroup[];
    active?: Recipe | null;
    sections: RecipeSection[];
    parameters: string[];
    note: string;
    base_units_produced: number;
}

export const RecipeFragment = gql`
    fragment RecipeFragment on Recipe {
        ...BaseFragment
        name
        item {
            ...TinyItemFragment
        }
        folder {
            _id
            name
        }
        version_date_groups {
            year
            month
            count
        }
        active {
            ...RecipeVersionFragment
        }
    }
`;
