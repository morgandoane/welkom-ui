import { Base } from "../Base/Base";
import { Company } from "../Company/Company";
import { Bol } from "../Bol/Bol";

export interface Itinerary extends Base {
  bols: Bol[];
  carrier?: Company;
}
