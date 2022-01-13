import { TinyProfile } from './../Profile/Profile';
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
    created_by: TinyProfile;
    date_created: Date;
    modified_by?: TinyProfile | null;
    date_modified?: Date | null;
}
