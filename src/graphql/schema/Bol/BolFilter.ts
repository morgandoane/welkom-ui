import { DateRangeInput } from '../DateRange/DateRange';
import { BaseFilter } from './../Base/BaseFilter';
import { BolStatus } from './Bol';

export interface BolFilter extends BaseFilter {
    order?: string;
    code?: string;
    status?: BolStatus;
    from_location?: string;
    to_location?: string;
    from_company?: string;
    to_company?: string;
    scheduled_dropoff_date?: DateRangeInput;
    scheduled_pickup_date?: DateRangeInput;
}
