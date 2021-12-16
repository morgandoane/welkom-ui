import { ItemContentInput } from "../Content/ContentInputs";

export interface CreateOrderInput {
  customer?: string;
  vendor?: string;
  contents: ItemContentInput[];
  due?: Date;
}

export interface UpdateOrderInput {
  customer?: string;
  vendor?: string;
  contents?: ItemContentInput[];
  due?: Date;
  deleted?: boolean;
}
