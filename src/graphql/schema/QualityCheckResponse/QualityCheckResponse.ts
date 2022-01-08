import { QualityCheck } from "./../QualityCheck/QualityCheck";

export interface QualityCheckResponse {
  qualityCheck: QualityCheck;
  response: string;
  passed: boolean;
}
