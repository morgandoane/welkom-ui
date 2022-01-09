import { Base } from '../Base/Base';

export enum UnitClass {
    Count = 'Count',
    Time = 'Time',
    Volume = 'Volume',
    Weight = 'Weight',
}

export interface Unit extends Base {
    class: UnitClass;
    english: string;
    spanish?: string;
    english_plural?: string;
    spanish_plural?: string;
    base_per_unit: number;
}

export interface TinyUnit {
    _id: string;
    class: UnitClass;
    english: string;
    spanish?: string;
    english_plural?: string;
    spanish_plural?: string;
    base_per_unit: number;
}
