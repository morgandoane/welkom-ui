import { BaseFilter } from '../Base/BaseFilter';
import { FulfillmentType } from './Fulfillment';

export interface FulfillmentFilter extends BaseFilter {
    type?: FulfillmentType;
    location?: string;
    company?: string;
    item?: string;
}
