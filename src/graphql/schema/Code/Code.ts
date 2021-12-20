export enum CodeType {
  BOL = "BOL",
  PO = "PO",
}

export interface Code {
  value: string;
  date_generated: Date;
  type: CodeType;
}
