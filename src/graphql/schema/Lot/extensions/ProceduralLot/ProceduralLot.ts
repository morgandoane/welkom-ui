import { TinyUnitFragment } from './../../../Unit/Unit';
import { BaseFragment } from './../../../../fragments/BaseFragment';
import { gql } from '@apollo/client';
import { LotContent } from '../../../Content/Content';
import { Lot } from '../../Lot';

export interface ProceduralLotContent extends LotContent {
    recipe_step: { _id: string } | null;
}

export const ProceduralLotContentFragment = gql`
    fragment ProceduralLotContentFragment on ProceduralLotContent {
        quantity
        unit {
            ...TinyUnitFragment
        }
        lot {
            ...TinyLotFragment
        }
        recipe_step {
            _id
        }
    }
`;

export interface ProceduralLot extends Lot {
    contents: ProceduralLotContent[];
}

export const ProceduralLotFragment = gql`
    fragment ProceduralLotFragment on ProceduralLot {
        ...BaseFragment
        contents {
            ...ProceduralLotContentFragment
        }
    }
`;
