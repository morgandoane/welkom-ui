import { ItemPluralContentInput } from './../Content/ContentInputs';

export interface RecipeSectionInput {
    label?: string;
    steps: RecipeStepInput[];
}

export interface RecipeSectionState extends RecipeSectionInput {
    id: string;
    steps: RecipeStepState[];
}

export type RecipeStepInput =
    | RecipeStepInstructionInput
    | RecipeStepContentInput;

interface RecipeStepInstructionInput {
    instruction: string;
}

interface RecipeStepContentInput {
    content: ItemPluralContentInput;
}

export type RecipeStepState = RecipeStepInput & { id: string };
