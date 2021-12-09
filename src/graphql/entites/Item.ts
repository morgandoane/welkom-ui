import { ConfiguredExpansive } from "./ConfiguredExpansive";
import { TypeNamed } from "./../types";
import { UnitClass } from "./Unit";

export interface Item extends TypeNamed<ConfiguredExpansive> {
  __typename: "Item";
  unit_class: UnitClass;
  english: string;
  spanish: string;
}
