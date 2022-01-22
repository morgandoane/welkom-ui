import { TinyItemFragment } from './../../queries/items/useTinyItems';
import { TinyItem } from './../Item/Item';
import { gql } from '@apollo/client';
import { RecipeSection } from './../RecipeStep/RecipeStep';
import { Base } from './../Base/Base';

export interface RecipeVersion extends Base {
    recipe: {
        _id: string;
        name: string;
        item: TinyItem;
    };
    sections: RecipeSection[];
    parameters: string[];
    base_units_produced: number;
    note?: string;
}

export const RecipeVersionFragment = gql`
    fragment RecipeVersionFragment on RecipeVersion {
        ...BaseFragment
        recipe {
            _id
            name
            item {
                ...TinyItemFragment
            }
        }
        sections {
            ...RecipeSectionFragment
        }
        parameters
        base_units_produced
        note
    }
`;
