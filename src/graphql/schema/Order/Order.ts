import { Itinerary } from "./../Itinerary/Itinerary";
import { TinyCompany } from "./../Company/Company";
import { OrderContent } from "./../Content/Content";
import { Base } from "../Base/Base";
import { AppFile } from "../AppFile/AppFile";

export interface Order extends Base {
  code: string;
  customer?: TinyCompany | null;
  vendor?: TinyCompany | null;
  contents: OrderContent[];
  itineraries: Itinerary[];
  files: AppFile[];
}
