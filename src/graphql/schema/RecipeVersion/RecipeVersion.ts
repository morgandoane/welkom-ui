import { gql } from '@apollo/client';
import { RecipeSection } from './../RecipeStep/RecipeStep';
import { Base } from './../Base/Base';

export interface RecipeVersion extends Base {
    recipe: {
        _id: string;
        name: string;
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
        }
        sections {
            ...RecipeSectionFragment
        }
        parameters
        base_units_produced
        note
    }
`;
