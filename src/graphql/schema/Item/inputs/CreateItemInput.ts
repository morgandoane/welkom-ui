import { UnitClass } from '../../Unit/UnitClass';

export interface CreateItemInput {
    identifier?: string;
    english: string;
    spanish: string;
    unit_class: UnitClass;
    tags: string[];
    conversion: number;
}
