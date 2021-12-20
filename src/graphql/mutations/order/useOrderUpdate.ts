import { OrderFragment } from "./../../queries/orders/OrderFragment";
import { getMutationHook, getQueryHook } from "./../../types";
import { UpdateOrderInput } from "./../../schema/Order/OrderInputs";
import { Order } from "./../../schema/Order/Order";
import { BaseFragment } from "./../../fragments/BaseFragment";
import { gql } from "@apollo/client";

export const UpdateOrder = gql`
  ${BaseFragment}
  ${OrderFragment}
  mutation UpdateOrder($id: ObjectId!, $data: UpdateOrderInput!) {
    updateOrder(data: $data) {
      ...OrderFragment
    }
  }
`;

export interface UpdateOrderRes {
  updateOrder: Order;
}

export interface UpdateOrderArgs {
  id: string;
  data: UpdateOrderInput;
}

export const useOrderUpdate = getMutationHook<UpdateOrderRes, UpdateOrderArgs>(
  UpdateOrder
);
