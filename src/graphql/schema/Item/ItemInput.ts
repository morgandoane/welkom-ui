import { UnitClass } from "../Unit/Unit";

export interface CreateItemInput {
  unit_class: UnitClass;
  english: string;
  spanish: string;
}

export interface UpdateItemInput {
  english?: string;
  spanish?: string;
  deleted?: boolean;
}
