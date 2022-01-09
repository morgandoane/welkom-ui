import { DateRangeInput } from '../DateRange/DateRange';
import { PaginateArg } from '../Pagination/Pagination';

export interface BaseFilter extends PaginateArg {
    deleted?: boolean;
    created_by?: string;
    modified_by?: string;
    date_created?: DateRangeInput;
    date_modified?: DateRangeInput;
}
