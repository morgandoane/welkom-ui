export interface OrderQueueLineInput {
    po: string | null;
    customer: string | null;
    vendor: string | null;
    destination: string | null;
    item: string | null;
    unit: string | null;
    quantity: number | null;
    date: Date | null;
    time: number | null;
}
