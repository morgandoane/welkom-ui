export interface UpdateItineraryInput {
    deleted: boolean;
    code: string | null;
    carrier: string | null;
    order_link?: string | null;
}
