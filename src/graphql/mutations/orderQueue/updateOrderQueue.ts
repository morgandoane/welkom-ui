import { getMutationHook } from "./../../types";
import { OrderQueueContentInput } from "./../../schema/OrderQueue/OrderQueueInput";
import { OrderQueueContent } from "./../../schema/OrderQueue/OrderQueue";
import { gql } from "@apollo/client";
import { OrderQueueContentFragment } from "../../schema/OrderQueue/OrderQueueContentFragment";

export const UpdateOrderQueue = gql`
  ${OrderQueueContentFragment}
  mutation UpdateOrderQueue($contents: [OrderQueueContentInput!]!) {
    updateOrderQueue(contents: $contents) {
      _id
      contents {
        ...OrderQueueContentFragment
      }
    }
  }
`;

export interface UpdateOrderQueueRes {
  updateOrderQueue: {
    id: string;
    contents: OrderQueueContent[];
  };
}

export interface UpdateOrderQueueArgs {
  contents: OrderQueueContentInput[];
}

export const useOrderQueueUpdate = getMutationHook<
  UpdateOrderQueueRes,
  UpdateOrderQueueArgs
>(UpdateOrderQueue);
