import { TypeNamed } from "../types";
import { ExpansiveConfig } from "./Config";
import { Configured } from "./Configured";

export interface ConfiguredExpansive extends TypeNamed<Configured> {
  __typename: "ConfiguredExpansive";
  config: ExpansiveConfig;
}
