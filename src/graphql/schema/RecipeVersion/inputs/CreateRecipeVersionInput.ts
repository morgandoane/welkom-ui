import { Ref } from '../../../types';
import { Recipe } from '../../Recipe/Recipe';
import { RecipeSectionInput } from '../../RecipeSection/RecipeSectionInput';

export interface CreateRecipeVersionInput {
    recipe: Ref<Recipe>;
    sections: RecipeSectionInput[];
    parameters: string[];
    base_qty: number;
}
