import { Address } from '../Address/Address';

export interface CreateLocationInput {
    company: string;
    address?: Address | null;
    label?: string;
}

export interface UpdateLocationInput {
    address?: Address | null;
    label?: string;
    deleted?: boolean;
}
