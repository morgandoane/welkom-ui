import { TypeNamed } from "./../types";
import { Address } from "./Address";
import { Base } from "./Base";
import { Company } from "./Company";

export interface CompanyLocation extends TypeNamed<Base> {
  __typename: "Location";
  address: Address;
  label: string;
}

export interface Location extends CompanyLocation {
  company: Company;
}
