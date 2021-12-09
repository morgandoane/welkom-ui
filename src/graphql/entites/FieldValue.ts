import { FieldType } from "./Field";

interface FieldValueBase {
  key: string;
}

type FieldValueType<T> = T | null;

export interface BooleanFieldValue extends FieldValueBase {
  __typename: "BooleanFieldValue";
  type: FieldType.Boolean;
  boolean_value: FieldValueType<boolean>;
}

export interface CompanyFieldValue extends FieldValueBase {
  __typename: "CompanyFieldValue";
  type: FieldType.Company;
  company_value: FieldValueType<string>;
}

export interface DateFieldValue extends FieldValueBase {
  __typename: "DateFieldValue";
  type: FieldType.Date;
  date_value: FieldValueType<Date>;
}

export interface IdentifierFieldValue extends FieldValueBase {
  __typename: "IdentifierFieldValue";
  type: FieldType.Identifier;
  identity_value: FieldValueType<string>;
}

export interface NumberFieldValue extends FieldValueBase {
  __typename: "NumberFieldValue";
  type: FieldType.Number;
  number_value: FieldValueType<number>;
}

export interface PercentageFieldValue extends FieldValueBase {
  __typename: "PercentageFieldValue";
  type: FieldType.Percentage;
  percentage_value: FieldValueType<number>;
}

export interface PersonFieldValue extends FieldValueBase {
  __typename: "PersonFieldValue";
  type: FieldType.Person;
  person_value: FieldValueType<string>;
}

export interface TextFieldValue extends FieldValueBase {
  __typename: "TextFieldValue";
  type: FieldType.Text;
  text_value: FieldValueType<string>;
}

export type FieldValue =
  | BooleanFieldValue
  | CompanyFieldValue
  | DateFieldValue
  | IdentifierFieldValue
  | NumberFieldValue
  | PercentageFieldValue
  | PersonFieldValue
  | TextFieldValue;

export type GetFieldValueType<T> = T extends FieldType.Boolean
  ? BooleanFieldValue
  : T extends FieldType.Company
  ? CompanyFieldValue
  : T extends FieldType.Date
  ? DateFieldValue
  : T extends FieldType.Identifier
  ? IdentifierFieldValue
  : T extends FieldType.Number
  ? NumberFieldValue
  : T extends FieldType.Percentage
  ? PercentageFieldValue
  : T extends FieldType.Person
  ? PersonFieldValue
  : T extends FieldType.Text
  ? TextFieldValue
  : never;
