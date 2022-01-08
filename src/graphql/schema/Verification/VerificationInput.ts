import { VerificationStatus } from "./Verification";

export interface CreateVerificationInput {
  status: VerificationStatus;
  notes?: string;
}

export interface UpdateVerificationInput {
  status: VerificationStatus;
  notes?: string;
  deleted?: boolean;
}
