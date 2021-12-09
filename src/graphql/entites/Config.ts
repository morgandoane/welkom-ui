import { TypeNamed } from "./../types";
import { Field } from "./Field";
import { Base } from "./Base";

export enum ExpansiveConfigKey {
  Item = "Item",
  Procedure = "Procedure",
  Lot = "Lot",
  Recipe = "Recipe",
}

export enum IsolatedConfigKey {
  Bol = "Bol",
  Company = "Company",
  Expense = "Expense",
  Order = "Order",
  Receipt = "Receipt",
  Recipe = "Recipe",
  Shipment = "Shipment",
}

interface Config extends TypeNamed<Base> {
  __typename: "Config";
  active: boolean;
  fields: Field[];
}

export interface IsolatedConfig extends TypeNamed<Config> {
  __typename: "IsolatedConfig";
  isolated_key: IsolatedConfigKey;
}

export interface ExpansiveConfig extends TypeNamed<Config> {
  __typename: "ExpansiveConfig";
  fields: Field[];
  expansive_key: ExpansiveConfigKey;
  name: string;
}
