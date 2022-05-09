import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';
import { UnitClass } from '../UnitClass';

export interface UpdateUnitInput extends UpdateBaseInput {
    class?: UnitClass;
    class_per_unit?: number;
    english?: string;
    spanish?: string;
    english_plural?: string;
    spanish_plural?: string;
}
