import { OrderFragment } from "./OrderFragment";
import { getQueryHook } from "./../../types";
import { Order } from "./../../schema/Order/Order";
import { BaseFragment } from "./../../fragments/BaseFragment";
import { gql } from "@apollo/client";

export const OrderQuery = gql`
  ${BaseFragment}
  ${OrderFragment}
  query OrderQuery($id: ObjectId!) {
    order(id: $id) {
      ...OrderFragment
    }
  }
`;

export interface OrderRes {
  order: Order;
}

export interface OrderArgs {
  id: string;
}

export const useOrder = getQueryHook<OrderRes, OrderArgs>(OrderQuery);
