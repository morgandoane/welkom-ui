import { TinyLocation } from './../../queries/locations/useTinyLocations';
import { TinyUnit } from './../Unit/Unit';
import { TinyItem } from './../Item/Item';
import { TinyCompany } from './../Company/Company';

export interface OrderQueueContent {
    order_code?: string | null;
    vendor?: TinyCompany | null;
    vendor_location?: TinyLocation | null;
    item?: TinyItem | null;
    unit?: TinyUnit | null;
    quantity?: number | null;
    location?: TinyLocation | null;
    date?: Date | null;
}

export interface OrderQueue {
    _id: string;
    contents: OrderQueueContent[];
}

export interface OrderQueueTemplate extends OrderQueue {
    title: string;
}

export interface OrderQueueRecord extends OrderQueue {
    date: Date;
}
