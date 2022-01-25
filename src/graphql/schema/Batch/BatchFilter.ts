import { BaseFilter } from './../Base/BaseFilter';
import { DateRangeInput } from '../DateRange/DateRange';

export interface BatchFilter extends BaseFilter {
    date_completed?: DateRangeInput;
    item?: string;
    location?: string;
}
