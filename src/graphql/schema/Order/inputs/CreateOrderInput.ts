import { Ref } from '../../../types';
import { Company } from '../../Company/Company';
import { OrderLineInput } from './OrderLineInput';

export interface CreateOrderInput {
    code: string;
    customer: Ref<Company> | null;
    vendor: Ref<Company> | null;
    lines: OrderLineInput[];
}
