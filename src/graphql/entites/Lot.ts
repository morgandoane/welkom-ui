import { TypeNamed } from "./../types";
import { FieldValue } from "./FieldValue";
import { Company } from "./Company";
import { Item } from "./Item";
import { LotContent } from "./Content";
import { ConfiguredExpansive } from "./ConfiguredExpansive";

export interface Lot extends TypeNamed<ConfiguredExpansive> {
  __typename: "Lot";
  code: string;
  item: Item;
  location?: Location | null;
  company?: Company | null;
  field_values: FieldValue[];
  contents: LotContent[];
}
