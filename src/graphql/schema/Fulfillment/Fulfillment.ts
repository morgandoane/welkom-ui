import { Base } from "../Base/Base";
import { Bol } from "../Bol/Bol";
import { Company } from "../Company/Company";
import { Location } from "../Location/Location";
import { Lot } from "../Lot/Lot";
import { Item } from "../Item/Item";

export enum FulfillmentType {
  Shipment = "Shipment",
  Receipt = "Receipt",
}

export interface Fulfillment extends Base {
  bol: Bol;
  type: FulfillmentType;
  lots: Lot[];
  items: Item[];
  company: Company;
  location: Location;
}
