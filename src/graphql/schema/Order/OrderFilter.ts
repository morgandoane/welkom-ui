import { BaseFilter } from "../Base/BaseFilter";
import { DateRangeInput } from "../DateRange/DateRange";

export interface OrderFilter extends BaseFilter {
  customer?: string;
  vendor?: string;
  item?: string;
  due?: DateRangeInput;
}
