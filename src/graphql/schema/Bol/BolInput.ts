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
  from?: BolAppointmentInput;
  to?: BolAppointmentInput;
  contents?: ItemContentInput[];
}

export interface UpdateBolInput {
  from?: BolAppointmentInput;
  to?: BolAppointmentInput;
  contents?: ItemContentInput[];
}
