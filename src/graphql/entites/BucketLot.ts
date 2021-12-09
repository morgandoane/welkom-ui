import { TypeNamed } from "./../types";
import { Lot } from "./Lot";

export interface BucketLot extends TypeNamed<Lot> {
  __typename: "BucketLot";
}
