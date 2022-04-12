import { DateRange } from './../../../utils/types/DateRange';
import { BaseFilter } from './../../inputsTypes';

export interface ItineraryFilter extends BaseFilter {
    internal?: true;
    carrier?: string;
    code?: string;
    order_link?: string | null;
    bol_number?: string;
    stop_date?: DateRange;
    dropoff_company?: string;
    pickup_company?: string;
}
