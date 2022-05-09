import { Ref } from '../../types';
import { QualityCheck } from '../QualityCheck/QualityCheck';

export interface QualityCheckResponseInput {
    qualityCheck: Ref<QualityCheck>;
    response: string;
}
