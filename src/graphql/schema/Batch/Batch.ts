import { TinyItemFragment } from './../../queries/items/useTinyItems';
import { BaseFragment } from './../../fragments/BaseFragment';
import {
    ProductionLine,
    ProductionLineFragment,
} from './../ProductionLine/ProductionLine';
import { TinyProfile } from './../Profile/Profile';
import { TinyItem } from './../Item/Item';
import { TinyLocation } from './../../queries/locations/useTinyLocations';
import { ProceduralLot } from './../Lot/extensions/ProceduralLot/ProceduralLot';
import {
    RecipeVersion,
    RecipeVersionFragment,
} from './../RecipeVersion/RecipeVersion';
import { Base } from './../Base/Base';
import { TinyLot } from '../Lot/Lot';
import { gql } from '@apollo/client';

export interface Batch extends Base {
    date_completed?: Date;
    recipe_version: RecipeVersion;
    lot: ProceduralLot;
    production_line?: ProductionLine;
    item: TinyItem;
    location: TinyLocation;
}

export const BatchFragment = gql`
    fragment BatchFragment on Batch {
        ...BaseFragment
        date_completed
        lot {
            ...ProceduralLotFragment
        }
        production_line {
            ...ProductionLineFragment
        }
        location {
            ...TinyLocationFragment
        }
        recipe_version {
            ...RecipeVersionFragment
        }
        item {
            ...TinyItemFragment
        }
    }
`;

export interface TinyBatch {
    _id: string;
    created_by: TinyProfile;
    date_created: Date;
    date_completed: Date | null;
    lot: TinyLot;
    production_line: ProductionLine | null;
    location: TinyLocation | null;
}

export const TinyBatchFragment = gql`
    fragment TinyBatchFragment on Batch {
        _id
        created_by {
            user_id
            email
            name
            picture
            given_name
            family_name
        }
        date_created
        date_completed
        lot {
            ...TinyProceduralLotFragment
        }
        production_line {
            ...ProductionLineFragment
        }
        location {
            ...TinyLocationFragment
        }
    }
`;
