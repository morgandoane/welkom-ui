import { UnitClass } from '../Unit/Unit';

export interface CreateItemInput {
    unit_class: UnitClass;
    english: string;
    spanish: string;
    default_vendor?: string;
    default_unit?: string;
}

export interface UpdateItemInput {
    english?: string;
    spanish?: string;
    deleted?: boolean;
    default_vendor?: string;
    default_unit?: string;
    unit_class?: UnitClass;
}
