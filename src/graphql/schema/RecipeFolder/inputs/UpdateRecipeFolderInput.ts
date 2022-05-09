import { Ref } from 'react';
import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';
import { RecipeFolder } from '../RecipeFolder';

export interface UpdateRecipeFolderInput extends UpdateBaseInput {
    parent?: Ref<RecipeFolder>;
    label?: string;
}
