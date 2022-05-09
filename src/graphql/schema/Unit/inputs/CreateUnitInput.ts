import { UnitClass } from '../UnitClass';

export interface CreateUnitInput {
    class: UnitClass;
    class_per_unit: number;
    english: string;
    spanish: string;
    english_plural: string;
    spanish_plural: string;
}
