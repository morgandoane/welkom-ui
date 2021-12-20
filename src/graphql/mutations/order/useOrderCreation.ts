import { OrderFragment } from "./../../queries/orders/OrderFragment";
import { getMutationHook, getQueryHook } from "./../../types";
import { CreateOrderInput } from "./../../schema/Order/OrderInputs";
import { Order } from "./../../schema/Order/Order";
import { BaseFragment } from "./../../fragments/BaseFragment";
import { gql } from "@apollo/client";

export const CreateOrder = gql`
  ${BaseFragment}
  ${OrderFragment}
  mutation CreateOrder($data: CreateOrderInput!) {
    createOrder(data: $data) {
      ...OrderFragment
    }
  }
`;

export interface CreateOrderRes {
  createOrder: Order;
}

export interface CreateOrderArgs {
  data: CreateOrderInput;
}

export const useOrderCreation = getMutationHook<
  CreateOrderRes,
  CreateOrderArgs
>(CreateOrder);
