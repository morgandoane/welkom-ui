export interface AddressInput {
    line_1: string;
    line_2?: string | null;
    line_3?: string | null;
    city: string;
    postal: string;
    state: string;
    country: string;
}
