import { ObjectType } from 'type-graphql';
import { Pagination } from '../Pagination/Pagination';
import { Order } from './Order';

@ObjectType()
export class OrderList extends Pagination(Order) {}
