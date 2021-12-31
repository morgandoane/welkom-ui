import { AppFileFragment } from "./../../schema/AppFile/AppFile";
import { OrderFragment } from "./../../queries/orders/OrderFragment";
import { getMutationHook } from "./../../types";
import { UpdateOrderInput } from "./../../schema/Order/OrderInputs";
import { Order } from "./../../schema/Order/Order";
import { BaseFragment } from "./../../fragments/BaseFragment";
import { gql } from "@apollo/client";
import { BolFragment } from "../../schema/Bol/Bol";
import { ItineraryFragment } from "../../schema/Itinerary/Itinerary";

export const UpdateOrder = gql`
  ${BaseFragment}
  ${BolFragment}
  ${OrderFragment}
  ${AppFileFragment}
  ${ItineraryFragment}
  mutation UpdateOrder($id: ObjectId!, $data: UpdateOrderInput!) {
    updateOrder(id: $id, data: $data) {
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
