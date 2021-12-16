import { Base } from "../Base/Base";
import { UnitClass } from "../Unit/Unit";

export interface Item extends Base {
  unit_class: UnitClass;
  english: string;
  spanish: string;
}

export interface TinyItem {
  _id: string;
  unit_class: UnitClass;
  english: string;
  spanish: string;
}
