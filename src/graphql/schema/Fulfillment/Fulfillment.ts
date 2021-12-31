import { TinyLocation } from "./../../queries/locations/useTinyLocations";
import { TinyCompany } from "./../Company/Company";
import { TinyItem } from "./../Item/Item";
import { Base } from "../Base/Base";
import { Lot } from "../Lot/Lot";

export enum FulfillmentType {
  Shipment = "Shipment",
  Receipt = "Receipt",
}

export interface Fulfillment extends Base {
  type: FulfillmentType;
  lots: Lot[];
  items: TinyItem[];
  company: TinyCompany;
  location: TinyLocation;
}

export interface TinyFulfillment {
  _id: string;
  deleted: boolean;
  type: FulfillmentType;
  items: TinyItem[];
  location: TinyLocation;
}
