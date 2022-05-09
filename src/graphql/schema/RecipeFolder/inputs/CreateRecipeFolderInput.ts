import { Ref } from '../../../types';
import { RecipeFolder } from '../RecipeFolder';

export interface CreateRecipeFolderInput {
    parent: Ref<RecipeFolder>;
    label: string;
}
