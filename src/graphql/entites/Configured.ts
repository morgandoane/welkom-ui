import { TypeNamed } from "./../types";
import { FieldValue } from "./FieldValue";
import { Base } from "./Base";

export interface Configured extends TypeNamed<Base> {
  __typename: "Configured";
  field_values: FieldValue[];
}
