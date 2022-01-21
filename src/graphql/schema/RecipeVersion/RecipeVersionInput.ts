import {
    RecipeSectionInput,
    RecipeSectionState,
} from './../RecipeStep/RecipeStepInput';

export interface RecipeVersionInput {
    recipe: string;
    sections: RecipeSectionInput[];
    parameters: string[];
    base_units_produced: number;
    note?: string;
}

export interface RecipeVersionState extends RecipeVersionInput {
    sections: RecipeSectionState[];
}

export const convertRecipeVersionState = ({
    sections,
    ...rest
}: RecipeVersionState): RecipeVersionInput => {
    return {
        ...rest,
        sections: sections.map(({ id, ...section }) => ({
            ...section,
            steps: section.steps.map(({ id, ...step }) => step),
        })),
    };
};
