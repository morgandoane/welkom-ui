import { Ref } from '../../../types';
import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';
import { Company } from '../../Company/Company';
import { OrderLineInput } from './OrderLineInput';

export interface UpdateOrderInput extends UpdateBaseInput {
    code?: string;
    customer?: Ref<Company> | null;
    vendor?: Ref<Company> | null;
    lines?: OrderLineInput[];
}
