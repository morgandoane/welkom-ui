import { BaseFilter } from '../Base/BaseFilter';
import { DateRangeInput } from '../DateRange/DateRange';

export interface ItineraryFilter extends BaseFilter {
    carrier?: string;
    code?: string;
    item?: string;
    location?: string;
    stop_date?: DateRangeInput;
}
