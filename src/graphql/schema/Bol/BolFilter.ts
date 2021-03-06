import { VerificationStatus } from './../Verification/Verification';
import { DateRangeInput } from '../DateRange/DateRange';
import { BaseFilter } from './../Base/BaseFilter';
import { BolStatus } from './Bol';

export interface BolFilter extends BaseFilter {
    order?: string;
    order_code?: string;
    lot_code?: string;
    code?: string;
    status?: BolStatus;
    from_location?: string;
    to_location?: string;
    from_company?: string;
    to_company?: string;
    scheduled_dropoff_date?: DateRangeInput;
    scheduled_pickup_date?: DateRangeInput;
    item?: string;
    verification_status?: VerificationStatus | null;
    fulfilled_by?: string;
}
