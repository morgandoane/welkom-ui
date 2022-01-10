import { TinyUnit } from './../../schema/Unit/Unit';
import { TinyItem } from './../../schema/Item/Item';
import { getQueryHook } from './../../types';
import { Pagination } from './../../schema/Pagination/Pagination';
import { gql } from '@apollo/client';
import { BolFilter } from '../../schema/Bol/BolFilter';
import { BolStatus } from './../../schema/Bol/Bol';

export const TinyBolsQuery = gql`
    query Bols($filter: BolFilter!) {
        bols(filter: $filter) {
            count
            items {
                _id
                from {
                    date
                }
                to {
                    date
                }
                itinerary {
                    _id
                    code
                }
                status
                code
                contents {
                    quantity
                    item {
                        _id
                        unit_class
                        english
                        spanish
                    }
                    unit {
                        _id
                        class
                        english
                        spanish
                        english_plural
                        spanish_plural
                        base_per_unit
                    }
                }
            }
        }
    }
`;

export interface TinyBol {
    _id: string;
    itinerary: {
        _id: string;
        code: string;
    };
    status: BolStatus;
    code: string;
    contents: {
        quantity: number;
        item: TinyItem;
        unit: TinyUnit;
    }[];
    from: {
        date: Date;
    };
    to: {
        date: Date;
    };
}

export interface TinyBolsArgs {
    filter: BolFilter;
}

export interface TinyBolsRes {
    bols: Pagination<TinyBol>;
}

export const useTinyBols = getQueryHook<TinyBolsRes, TinyBolsArgs>(
    TinyBolsQuery
);
