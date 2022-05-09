import { RecipeStepInput } from '../RecipeStep/RecipeStepInput';

export interface RecipeSectionInput {
    label?: string | null;
    steps: RecipeStepInput[];
}
