import { FulfillmentType } from "./Fulfillment";

export interface FulfillmentInput {
  bol: string;
  type: FulfillmentType;
  lots: FulfillmentLotFinder[];
  location: string;
  company: string;
}

export interface FulfillmentLotFinder {
  item: string;
  code: string;
  company: string;
  location?: string;
}
