export interface OrderQueueContentInput {
  order_code?: string;
  item?: string;
  unit?: string;
  quantity?: number;
  location?: string;
  date?: Date;
  vendor?: string;
  vendor_location?: string;
}
