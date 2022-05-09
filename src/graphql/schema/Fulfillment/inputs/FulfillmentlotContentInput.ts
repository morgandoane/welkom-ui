import { Ref } from '../../../types';
import { Company } from '../../Company/Company';
import { Unit } from '../../Unit/Unit';

export interface FulfillmentLotContentInput {
    vendor: Ref<Company>;
    code: string;
    client_unit: Ref<Unit>;
    client_qty: number;
}
