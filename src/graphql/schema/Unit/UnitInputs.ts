import { UnitClass } from './Unit';

export interface CreateUnitInput {
    class: UnitClass;
    english: string;
    spanish?: string;
    english_plural?: string;
    spanish_plural?: string;
    base_per_unit: number;
}

export interface UpdateUnitInput {
    class?: UnitClass;
    english?: string;
    spanish?: string;
    english_plural?: string;
    spanish_plural?: string;
    deleted?: boolean;
    base_per_unit?: number;
}
