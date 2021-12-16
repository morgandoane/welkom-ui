import { Base } from "../Base/Base";
import { ItemContent } from "../Content/Content";
import { Company } from "../Company/Company";

export interface Order extends Base {
  customer?: Company;
  vendor?: Company;
  contents: ItemContent[];
  due?: Date;
}
