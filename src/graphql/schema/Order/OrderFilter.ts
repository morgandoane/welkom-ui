import { DateRange } from './../../../utils/types/DateRange';
import { BaseFilter } from './../../inputsTypes';

export interface OrderFilter extends BaseFilter {
    po?: string;
    customer?: string;
    vendor?: string;
    item?: string;
    date_range?: DateRange;
}
