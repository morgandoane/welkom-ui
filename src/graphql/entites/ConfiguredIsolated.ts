import { TypeNamed } from "../types";
import { IsolatedConfig } from "./Config";
import { Configured } from "./Configured";

export interface ConfiguredIsolated extends TypeNamed<Configured> {
  __typename: "ConfiguredIsolated";
  config: IsolatedConfig;
}
