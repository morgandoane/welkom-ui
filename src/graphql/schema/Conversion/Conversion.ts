import { Base } from "../Base/Base";
import { UnitClass } from "../Unit/Unit";

export interface ConversionInput {
  from: UnitClass;
  to: UnitClass;
  from_per_to: number;
}

export type Conversion = ConversionInput & Base;
