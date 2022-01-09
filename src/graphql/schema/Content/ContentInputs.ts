export interface ContentInput {
    quantity: number;
    unit: string;
}

export interface ItemContentInput extends ContentInput {
    item: string;
}

export interface ItemPluralContentInput extends ContentInput {
    items: string[];
}

export interface OrderContentInput extends ItemContentInput {
    location: string;
    due: Date;
}

export interface LotContentInput extends ContentInput {
    lot: string;
}

export type ProceduralLotContentInput = LotContentInput;

export type BucketLotContentInput = LotContentInput;
