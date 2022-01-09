import { LotContentInput } from '../Content/ContentInputs';

export interface LotInput {
    code: string;
    item: string;
    location?: string;
    company?: string;
    contents: LotContentInput[];
}

export interface UpdateLotInput {
    code?: string;
    item?: string;
    location?: string;
    company?: string;
    contents?: LotContentInput[];
}
