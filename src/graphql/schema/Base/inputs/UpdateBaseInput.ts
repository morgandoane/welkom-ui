import { CertificationInput } from '../../Certification/CertificationInput';
import { VerificationInput } from '../../Verification/VerificationInput';

export interface UpdateBaseInput {
    deleted?: boolean;
    certifications?: CertificationInput[];
    verification?: VerificationInput | null;
}
