import { QualityCheckResponseInput } from '../QualityCheckResponse/QualityCheckResponseInput';
import { FulfillmentType } from './Fulfillment';

export interface FulfillmentLotFinder {
    code: string;
    quantity: number | null;
    unit: string;
    company: string;
    location?: string;
}

export interface FulfillmentItemInput {
    item: string;
    lots: FulfillmentLotFinder[];
    quality_check_responses: QualityCheckResponseInput[];
}

export interface CreateFulfillmentInput {
    bol: string;
    bol_code_override?: string;
    seal?: string;
    items: FulfillmentItemInput[];
    type: FulfillmentType;
    location: string;
    company: string;
}

export interface UpdateFulfillmentInput extends CreateFulfillmentInput {
    deleted?: boolean;
}
