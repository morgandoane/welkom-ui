import { ConfiguredIsolated } from "./ConfiguredIsolated";
import { TypeNamed } from "./../types";
import { Company } from "./Company";
import { ItemContent } from "./Content";

export interface Order extends TypeNamed<ConfiguredIsolated> {
  __typename: "Order";
  customer?: Company | null;
  vendor?: Company | null;
  contents: ItemContent[];
  due?: Date | null;
}
