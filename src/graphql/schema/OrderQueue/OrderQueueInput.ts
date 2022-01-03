export interface OrderQueueContentInput {
  order_code?: string;
  item?: string;
  company?: string;
  unit?: string;
  quantity?: number;
  location?: string;
  date?: Date;
}

export interface OrderQueueContentInputState extends OrderQueueContentInput {
  id: string;
}
