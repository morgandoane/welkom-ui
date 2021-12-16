import { Base } from "../Base/Base";
import { Fulfillment } from "../Fulfillment/Fulfillment";
import { ItemContent } from "../Content/Content";
import { Company } from "../Company/Company";
import { Location } from "../Location/Location";

export interface BolAppointmentBase {
  date?: Date;
}

export interface BolAppointment_Company extends BolAppointmentBase {
  type: "Company";
  company: Company;
}

export interface BolAppointment_Location extends BolAppointmentBase {
  type: "Location";
  location: Location;
}

export type BolAppointment = BolAppointment_Company | BolAppointment_Location;

export interface Bol extends Base {
  from?: BolAppointment;
  to?: BolAppointment;
  contents: ItemContent[];
  shipments?: Fulfillment[];
  receipts?: Fulfillment[];
}
