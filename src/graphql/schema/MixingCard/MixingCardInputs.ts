import { MixingCardLineInput } from './../MixingCardLine/MixingCardLineInputs';

export interface CreateMixingCardInput {
    location: string;
    production_line: string | null;
    profile: string;
    lines: MixingCardLineInput[];
}

export interface UpdateMixingCardInput {
    deleted?: boolean;
    location: string;
    profile: string;
    lines: MixingCardLineInput[];
    production_line: string | null;
}
