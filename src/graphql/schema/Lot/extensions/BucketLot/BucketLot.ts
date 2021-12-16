import { LotContent } from "../../../Content/Content";
import { Lot } from "../../Lot";

export type BucketLotContent = LotContent;

export interface BucketLot extends Lot {
  contents: BucketLotContent[];
}
