import { UpdateMixingCardInput } from '../../schema/MixingCard/MixingCardInputs';
import { getMutationHook } from '../../types';
import { gql } from '@apollo/client';
import {
    MixingCard,
    MixingCardFragment,
} from '../../schema/MixingCard/MixingCard';
import { BaseFragment } from '../../fragments/BaseFragment';
import { TinyItemFragment } from '../../queries/items/useTinyItems';
import { MixingCardLineFragment } from '../../schema/MixingCardLine/MixingCardLine';
import { RecipeFragment } from '../../schema/Recipe/Recipe';
import {
    RecipeSectionFragment,
    RecipeStepFragment,
} from '../../schema/RecipeStep/RecipeStep';
import { RecipeVersionFragment } from '../../schema/RecipeVersion/RecipeVersion';
import { TinyUnitFragment } from '../../schema/Unit/Unit';
import { ProductionLineFragment } from '../../schema/ProductionLine/ProductionLine';

export const UpdateMixingCard = gql`
    ${MixingCardFragment}
    ${BaseFragment}
    ${MixingCardLineFragment}
    ${TinyItemFragment}
    ${RecipeVersionFragment}
    ${RecipeSectionFragment}
    ${RecipeStepFragment}
    ${TinyUnitFragment}
    ${RecipeFragment}
    ${ProductionLineFragment}
    mutation UpdateMixingCard($id: ObjectId!, $data: UpdateMixingCardInput!) {
        updateMixingCard(id: $id, data: $data) {
            ...MixingCardFragment
        }
    }
`;

export interface UpdateMixingCardRes {
    updateMixingCard: MixingCard;
}

export interface UpdateMixingCardArgs {
    id: string;
    data: UpdateMixingCardInput;
}

export const useMixingCardUpdate = getMutationHook<
    UpdateMixingCardRes,
    UpdateMixingCardArgs
>(UpdateMixingCard);
