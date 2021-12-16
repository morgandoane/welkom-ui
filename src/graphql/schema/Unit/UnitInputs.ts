import { UnitClass } from "./Unit";

export interface CreateUnitInput {
  class: UnitClass;
  english: string;
  spanish?: string;
  english_plural?: string;
  spanish_plural?: string;
}

export interface UpdateUnitInput {
  class?: UnitClass;
  english?: string;
  spanish?: string;
  english_plural?: string;
  spanish_plural?: string;
  deleted?: boolean;
}
