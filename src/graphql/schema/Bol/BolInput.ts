import { ItemContentInput } from "../Content/ContentInputs";

export enum BolAppointmentType {
  Company = "Company",
  Location = "Location",
}

export interface BolAppointmentInput {
  type: BolAppointmentType;
  target: string;
}

export interface CreateBolInput {
  code: string;
  from?: BolAppointmentInput;
  to?: BolAppointmentInput;
  contents?: ItemContentInput[];
}

export interface UpdateBolInput {
  code?: string;
  from?: BolAppointmentInput;
  to?: BolAppointmentInput;
  contents?: ItemContentInput[];
}
