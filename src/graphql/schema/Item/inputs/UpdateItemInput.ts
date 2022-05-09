import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';

export interface UpdateItemInput extends UpdateBaseInput {
    identifier?: string | null;
    english?: string;
    spanish?: string;
    english_plural?: string;
    spanish_plural?: string;
    tags?: string[];
    conversion?: number;
}
