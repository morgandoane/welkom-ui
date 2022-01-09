import { TinyUnit } from './../Unit/Unit';
import { TinyItem } from './../Item/Item';
import { Lot } from '../Lot/Lot';
import { TinyLocation } from '../../queries/locations/useTinyLocations';

export interface Content {
    quantity: number;
    unit: TinyUnit;
}

export interface ItemContent extends Content {
    item: TinyItem;
}

export interface BolItemContent extends ItemContent {
    fulfillment_percentage: number;
}

export interface ItemPluralContent extends Content {
    items: TinyItem[];
}

export interface OrderContent extends ItemContent {
    location: TinyLocation;
    due: Date;
}

export interface LotContent extends Content {
    lot: Lot;
}
