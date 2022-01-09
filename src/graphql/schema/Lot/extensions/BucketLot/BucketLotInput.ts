import { UpdateLotInput } from '../../LotInput';
import { LotInput } from '../../LotInput';
import { BucketLotContentInput } from '../../../Content/ContentInputs';

export interface BucketLotInput extends LotInput {
    contents: BucketLotContentInput[];
}

export interface UpdateBucketLotInput extends UpdateLotInput {
    contents?: BucketLotContentInput[];
}
