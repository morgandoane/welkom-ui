import { TypeNamed } from "./../types";
import { Base } from "./Base";

export enum UnitClass {
  Count = "Count",
  Time = "Time",
  Volume = "Volume",
  Weight = "Weight",
}

export interface Unit extends TypeNamed<Base> {
  __typename: "Unit";
  class: UnitClass;
  english: string;
  spanish?: string;
  english_plural?: string;
  spanish_plural?: string;
}
