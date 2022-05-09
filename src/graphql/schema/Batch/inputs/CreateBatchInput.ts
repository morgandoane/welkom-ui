import { Ref } from '../../../types';
import { Location } from '../../Location/Location';
import { RecipeVersion } from '../../RecipeVersion/RecipeVersion';

export interface CreateBatchInput {
    location: Ref<Location>;
    recipe_version: Ref<RecipeVersion>;
}
