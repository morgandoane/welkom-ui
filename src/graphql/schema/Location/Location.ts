import { Address } from '../Address/Address';
import { Base } from '../Base/Base';

export interface Location extends Base {
    address?: Address;
    label?: string;
}
