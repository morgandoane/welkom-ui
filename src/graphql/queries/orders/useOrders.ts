import { OrderFragment } from "./OrderFragment";
import { getQueryHook } from "./../../types";
import { BaseFragment } from "./../../fragments/BaseFragment";
import { OrderFilter } from "../../schema/Order/OrderFilter";
import { gql } from "@apollo/client";
import { Pagination } from "../../schema/Pagination/Pagination";
import { Order } from "../../schema/Order/Order";

export const TinyOrders = gql`
  ${BaseFragment}
  ${OrderFragment}
  query TinyOrders($filter: OrderFilter!) {
    orders(filter: $filter) {
      count
      items {
        ...OrderFragment
      }
    }
  }
`;

export interface OrdersRes {
  orders: Pagination<Order>;
}

export interface OrdersArgs {
  filter: OrderFilter;
}

export const useOrders = getQueryHook<OrdersRes, OrdersArgs>(TinyOrders);
