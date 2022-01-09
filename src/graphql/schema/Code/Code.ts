export enum CodeType {
    BOL = 'BOL',
    PO = 'PO',
    ITIN = 'ITIN',
}

export interface Code {
    value: string;
    date_generated: Date;
    type: CodeType;
}
