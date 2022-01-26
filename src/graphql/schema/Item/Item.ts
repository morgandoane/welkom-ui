import { TinyProfile } from './../Profile/Profile';
import { TinyUnit } from './../Unit/Unit';
import { TinyCompany } from './../Company/Company';
import { Conversion } from './../Conversion/Conversion';
import { AppFile } from '../AppFile/AppFile';
import { Base } from '../Base/Base';
import { UnitClass } from '../Unit/Unit';

export enum ItemType {
    Product = 'Product',
    Cookie = 'Cookie',
}

export interface Item extends Base {
    type: ItemType | null;
    unit_class: UnitClass;
    english: string;
    spanish: string;
    files: AppFile[];
    conversions: Conversion[];
    default_vendor?: TinyCompany | null;
    default_unit?: TinyUnit | null;
    upc: string | null;
    to_base_unit: number;
}

export interface TinyItem {
    _id: string;
    type: ItemType | null;
    unit_class: UnitClass;
    english: string;
    spanish: string;
    default_vendor?: TinyCompany | null;
    default_unit?: TinyUnit | null;
    order_queue_qty?: number | null;
    created_by: TinyProfile;
    modified_by: TinyProfile;
    date_modified: Date;
    date_created: Date;
    to_base_unit: number;
    upc: string | null;
}
