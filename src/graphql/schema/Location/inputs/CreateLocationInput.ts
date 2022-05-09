import { AddressInput } from '../../Address/AddressInput';

export interface CreateLocationInput {
    name: string;
    company: string;
    address?: AddressInput;
}
