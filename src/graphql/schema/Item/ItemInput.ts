import { ItemType } from './Item';
import { UnitClass } from '../Unit/Unit';

export interface CreateItemInput {
    unit_class: UnitClass;
    english: string;
    spanish: string;
    to_base_unit: number;
    default_vendor?: string;
    default_unit?: string;
    type?: ItemType | null;
    upc?: string | null;
    category?: string | null;
}

export interface UpdateItemInput {
    english?: string;
    spanish?: string;
    deleted?: boolean;
    default_vendor?: string;
    to_base_unit?: number;
    default_unit?: string;
    unit_class?: UnitClass;
    type?: ItemType | null;
    upc?: string | null;
    category?: string | null;
}
