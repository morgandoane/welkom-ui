import { getModelForClass } from '@typegoose/typegoose';
import { Order } from './Order';

export const OrderModel = getModelForClass(Order);
