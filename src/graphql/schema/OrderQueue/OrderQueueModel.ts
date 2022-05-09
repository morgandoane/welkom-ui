import { getModelForClass } from '@typegoose/typegoose';
import { OrderQueue } from './OrderQueue';

export const OrderQueueModel = getModelForClass(OrderQueue);
