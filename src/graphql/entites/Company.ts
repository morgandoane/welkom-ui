import { ConfiguredIsolated } from "./ConfiguredIsolated";
import { TypeNamed } from "./../types";
import { Location } from "./Location";

export interface Company extends TypeNamed<ConfiguredIsolated> {
  __typename: "Company";
  locations: Location;
}
