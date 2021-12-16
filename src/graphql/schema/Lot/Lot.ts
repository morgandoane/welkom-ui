import { Base } from "../Base/Base";
import { Item } from "../Item/Item";
import { Location } from "../Location/Location";
import { Company } from "../Company/Company";
import { LotContent } from "../Content/Content";

export interface Lot extends Base {
  code: string;
  item: Item;
  location?: Location;
  company?: Company;
  contents: LotContent[];
}
