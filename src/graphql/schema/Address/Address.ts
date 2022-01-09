export interface Coordinate {
    lat: number;
    lon: number;
}

export interface Address {
    line_1: string;
    line_2?: string;
    city: string;
    state: string;
    postal: string;
    country?: string;
    coordinate?: Coordinate;
}
