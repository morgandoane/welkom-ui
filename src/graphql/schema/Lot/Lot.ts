import { TinyItemFragment } from './../../queries/items/useTinyItems';
import { QualityCheckResponse } from './../QualityCheckResponse/QualityCheckResponse';
import { TinyItem } from './../Item/Item';
import { TinyCompany } from './../Company/Company';
import {
    TinyLocation,
    TinyLocationFragment,
} from './../../queries/locations/useTinyLocations';
import { Base } from '../Base/Base';
import { LotContent } from '../Content/Content';
import { gql } from '@apollo/client';

export interface Lot extends Base {
    code: string;
    item: TinyItem;
    location?: TinyLocation | null;
    company?: TinyCompany | null;
    contents: LotContent[];
    quality_check_responses: QualityCheckResponse[];
}

export interface TinyLot {
    _id: string;
    code: string;
    item: TinyItem;
}

export const TinyLotFragment = gql`
    fragment TinyLotFragment on Lot {
        _id
        code
        item {
            ...TinyItemFragment
        }
        company {
            _id
            name
        }
        location {
            ...TinyLocationFragment
        }
    }
`;

export const TinyProceduralLotFragment = gql`
    fragment TinyProceduralLotFragment on ProceduralLot {
        _id
        code
        location {
            ...TinyLocationFragment
        }
        item {
            ...TinyItemFragment
        }
    }
`;

export const TinyBucketLotFragment = gql`
    fragment TinyBucketLotFragment on BucketLot {
        _id
        code
        location {
            ...TinyLocationFragment
        }
        item {
            ...TinyItemFragment
        }
    }
`;
