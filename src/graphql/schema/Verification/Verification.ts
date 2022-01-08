import { gql } from "@apollo/client";
import { Base } from "./../Base/Base";

export enum VerificationStatus {
  Verified = "Verified",
  Warning = "Warning",
  Problem = "Problem",
}

export interface Verification extends Base {
  status: VerificationStatus;
  notes?: string;
}

export const VerificationFragment = gql`
  fragment VerificationFragment on Verification {
    ...BaseFragment
    status
    notes
  }
`;
