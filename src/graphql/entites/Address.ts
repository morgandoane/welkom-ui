import { Coordinate } from "./Coordinate";

export interface Address {
  __typename: "Address";
  line_1: string;
  line_2?: string | null;
  city: string;
  state: string;
  postal: string;
  country: string;
  coordinate?: Coordinate | null;
}
