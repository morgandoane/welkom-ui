import { QualityCheckResponse } from "./../QualityCheckResponse/QualityCheckResponse";
import { TinyItem } from "./../Item/Item";
import { TinyCompany } from "./../Company/Company";
import { TinyLocation } from "./../../queries/locations/useTinyLocations";
import { Base } from "../Base/Base";
import { LotContent } from "../Content/Content";

export interface Lot extends Base {
  code: string;
  item: TinyItem;
  location?: TinyLocation | null;
  company?: TinyCompany | null;
  contents: LotContent[];
  quality_check_responses: QualityCheckResponse[];
}
