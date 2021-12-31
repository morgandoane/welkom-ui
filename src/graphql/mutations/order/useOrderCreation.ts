import { BolFragment } from "./../../schema/Bol/Bol";
import { ItineraryFragment } from "./../../schema/Itinerary/Itinerary";
import { OrderFragment } from "./../../queries/orders/OrderFragment";
import { getMutationHook, getQueryHook } from "./../../types";
import { CreateOrderInput } from "./../../schema/Order/OrderInputs";
import { Order } from "./../../schema/Order/Order";
import { BaseFragment } from "./../../fragments/BaseFragment";
import { gql } from "@apollo/client";
import { AppFileFragment } from "../../schema/AppFile/AppFile";

export const CreateOrder = gql`
  ${BaseFragment}
  ${BolFragment}
  ${OrderFragment}
  ${AppFileFragment}
  ${ItineraryFragment}
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
