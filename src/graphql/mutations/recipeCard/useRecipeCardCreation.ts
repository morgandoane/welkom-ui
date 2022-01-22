import { RecipeFragment } from './../../schema/Recipe/Recipe';
import { TinyUnitFragment } from './../../schema/Unit/Unit';
import {
    RecipeSectionFragment,
    RecipeStepFragment,
} from './../../schema/RecipeStep/RecipeStep';
import { RecipeVersionFragment } from './../../schema/RecipeVersion/RecipeVersion';
import { CreateMixingCardInput } from './../../schema/MixingCard/MixingCardInputs';
import { getMutationHook } from './../../types';
import { gql } from '@apollo/client';
import {
    MixingCard,
    MixingCardFragment,
} from '../../schema/MixingCard/MixingCard';
import { BaseFragment } from '../../fragments/BaseFragment';
import { TinyItemFragment } from '../../queries/items/useTinyItems';
import { MixingCardLineFragment } from '../../schema/MixingCardLine/MixingCardLine';

export const CreateMixingCard = gql`
    ${MixingCardFragment}
    ${BaseFragment}
    ${MixingCardLineFragment}
    ${TinyItemFragment}
    ${RecipeVersionFragment}
    ${RecipeSectionFragment}
    ${RecipeStepFragment}
    ${TinyUnitFragment}
    ${RecipeFragment}
    mutation CreateMixingCard($data: CreateMixingCardInput!) {
        createMixingCard(data: $data) {
            ...MixingCardFragment
        }
    }
`;

export interface CreateMixingCardRes {
    createMixingCard: MixingCard;
}

export interface CreateMixingCardArgs {
    data: CreateMixingCardInput;
}

export const useMixingCardCreation = getMutationHook<
    CreateMixingCardRes,
    CreateMixingCardArgs
>(CreateMixingCard);
