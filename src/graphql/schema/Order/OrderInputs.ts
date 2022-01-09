import { OrderContentInput } from './../Content/ContentInputs';

export interface CreateOrderInput {
    code: string;
    customer?: string;
    vendor?: string;
    contents: OrderContentInput[];
}

export interface UpdateOrderInput {
    code?: string;
    customer?: string;
    vendor?: string;
    contents?: OrderContentInput[];
    deleted?: boolean;
}
