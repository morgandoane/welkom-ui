export enum FieldType {
  Boolean = "Boolean",
  Company = "Company",
  Date = "Date",
  Identifier = "Identifier",
  Number = "Number",
  Percentage = "Percentage",
  Person = "Person",
  Text = "Text",
}

interface FieldBase {
  key: string;
  required: boolean;
}

export interface BooleanField extends FieldBase {
  __typename: "BooleanField";
  type: FieldType.Boolean;
}

export interface CompanyField extends FieldBase {
  __typename: "CompanyField";
  type: FieldType.Company;
}

export interface DateField extends FieldBase {
  __typename: "DateField";
  type: FieldType.Date;
}

export interface IdentifierField extends FieldBase {
  __typename: "IdentifierField";
  type: FieldType.Identifier;
}

export interface NumberField extends FieldBase {
  __typename: "NumberField";
  type: FieldType.Number;
}

export interface PercentageField extends FieldBase {
  __typename: "PercentageField";
  type: FieldType.Percentage;
}

export interface PersonField extends FieldBase {
  __typename: "PersonField";
  type: FieldType.Person;
}

export interface TextField extends FieldBase {
  __typename: "TextField";
  type: FieldType.Text;
}

export type Field =
  | BooleanField
  | CompanyField
  | DateField
  | IdentifierField
  | NumberField
  | PercentageField
  | PersonField
  | TextField;

export type GetFieldType<T> = T extends FieldType.Boolean
  ? BooleanField
  : T extends FieldType.Company
  ? CompanyField
  : T extends FieldType.Date
  ? DateField
  : T extends FieldType.Identifier
  ? IdentifierField
  : T extends FieldType.Number
  ? NumberField
  : T extends FieldType.Percentage
  ? PercentageField
  : T extends FieldType.Person
  ? PersonField
  : T extends FieldType.Text
  ? TextField
  : never;
