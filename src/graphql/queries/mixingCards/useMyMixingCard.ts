import {
    MixingCard,
    MixingCardFragment,
} from './../../schema/MixingCard/MixingCard';
import { gql } from '@apollo/client';
import { BaseFragment } from '../../fragments/BaseFragment';
import { MixingCardLineFragment } from '../../schema/MixingCardLine/MixingCardLine';
import { TinyItemFragment } from '../items/useTinyItems';
import { getQueryHook } from '../../types';
import {
    RecipeSectionFragment,
    RecipeStepFragment,
} from '../../schema/RecipeStep/RecipeStep';
import { RecipeVersionFragment } from '../../schema/RecipeVersion/RecipeVersion';
import { TinyUnitFragment } from '../../schema/Unit/Unit';
import { RecipeFragment } from '../../schema/Recipe/Recipe';

export const MyMixingCard = gql`
    ${MixingCardFragment}
    ${BaseFragment}
    ${MixingCardLineFragment}
    ${TinyItemFragment}
    ${RecipeVersionFragment}
    ${RecipeSectionFragment}
    ${RecipeStepFragment}
    ${TinyUnitFragment}
    ${RecipeFragment}
    query MyMixingCard {
        myMixingCard {
            ...MixingCardFragment
        }
    }
`;

export interface MyMixingCardRes {
    myMixingCard: MixingCard | null;
}

export const useMyMixingCard = getQueryHook<MyMixingCardRes>(MyMixingCard);
