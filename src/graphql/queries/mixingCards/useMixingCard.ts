import { RecipeVersionFragment } from './../../schema/RecipeVersion/RecipeVersion';
import {
    RecipeSectionFragment,
    RecipeStepFragment,
} from './../../schema/RecipeStep/RecipeStep';
import {
    MixingCard,
    MixingCardFragment,
} from './../../schema/MixingCard/MixingCard';
import { gql } from '@apollo/client';
import { BaseFragment } from '../../fragments/BaseFragment';
import { MixingCardLineFragment } from '../../schema/MixingCardLine/MixingCardLine';
import { TinyItemFragment } from '../items/useTinyItems';
import { getQueryHook } from '../../types';
import { TinyUnitFragment } from '../../schema/Unit/Unit';
import { RecipeFragment } from '../../schema/Recipe/Recipe';
import { ProductionLineFragment } from '../../schema/ProductionLine/ProductionLine';

export const MixingCardQuery = gql`
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
    query MixingCardQUery($id: ObjectId!) {
        mixingCard(id: $id) {
            ...MixingCardFragment
        }
    }
`;

export interface MixingCardRes {
    mixingCard: MixingCard;
}

export interface MixingCardArgs {
    id: string;
}

export const useMixingCard = getQueryHook<MixingCardRes, MixingCardArgs>(
    MixingCardQuery
);
