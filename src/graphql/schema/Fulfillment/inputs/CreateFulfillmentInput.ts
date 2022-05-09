import { Ref } from '../../../types';
import { Bol } from '../../Bol/Bol';
import { FulfillmentType } from '../FulfillmentType';
import { FulfillmentContentInput } from './FulfillmentContentInput';

export interface CreateFulfillmentInput {
    bol: Ref<Bol>;
    type: FulfillmentType;
    pallet_count: number;
    contents: FulfillmentContentInput[];
}
