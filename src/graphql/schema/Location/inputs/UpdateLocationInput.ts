import { AddressInput } from '../../Address/AddressInput';
import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';

export interface UpdateLocationInput extends UpdateBaseInput {
    name?: string;
    company?: string;
    address?: AddressInput | null;
}
