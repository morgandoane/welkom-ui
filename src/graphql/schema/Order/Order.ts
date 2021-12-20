import { TinyCompany } from "./../Company/Company";
import { OrderContent } from "./../Content/Content";
import { Base } from "../Base/Base";

export interface Order extends Base {
  code: string;
  customer?: TinyCompany | null;
  vendor?: TinyCompany | null;
  contents: OrderContent[];
}
