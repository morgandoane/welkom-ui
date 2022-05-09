import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';
import { BatchStatus } from '../BatchStatus';
import { BatchContentInput } from './BatchContentInput';

export interface UpdateBatchInput extends UpdateBaseInput {
    contents?: BatchContentInput[];
    status?: BatchStatus;
}
