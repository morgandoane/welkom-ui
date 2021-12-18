import { AppFile } from "../AppFile/AppFile";
import { Base } from "../Base/Base";
import { UnitClass } from "../Unit/Unit";

export interface Item extends Base {
  unit_class: UnitClass;
  english: string;
  spanish: string;
  files: AppFile[];
}

export interface TinyItem {
  _id: string;
  unit_class: UnitClass;
  english: string;
  spanish: string;
}
