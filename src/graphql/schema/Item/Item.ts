import { TinyUnit } from './../Unit/Unit';
import { TinyCompany } from './../Company/Company';
import { Conversion } from './../Conversion/Conversion';
import { AppFile } from '../AppFile/AppFile';
import { Base } from '../Base/Base';
import { UnitClass } from '../Unit/Unit';

export interface Item extends Base {
    unit_class: UnitClass;
    english: string;
    spanish: string;
    files: AppFile[];
    conversions: Conversion[];
    default_vendor?: TinyCompany | null;
    default_unit?: TinyUnit | null;
}

export interface TinyItem {
    _id: string;
    unit_class: UnitClass;
    english: string;
    spanish: string;
    default_vendor?: TinyCompany | null;
    default_unit?: TinyUnit | null;
    order_queue_qty?: number | null;
}
