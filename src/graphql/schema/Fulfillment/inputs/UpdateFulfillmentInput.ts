import { Ref } from '../../../types';
import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';
import { Bol } from '../../Bol/Bol';
import { FulfillmentContentInput } from './FulfillmentContentInput';

export interface UpdateFulfillmentInput extends UpdateBaseInput {
    bol?: Ref<Bol>;
    contents?: FulfillmentContentInput[];
    pallet_count?: number;
}
