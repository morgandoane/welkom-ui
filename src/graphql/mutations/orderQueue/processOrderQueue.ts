import { getMutationHook } from "../../types";
import { OrderQueueContentFragment } from "../../schema/OrderQueue/OrderQueueContentFragment";
import { gql } from "@apollo/client";
import { OrderQueue } from "../../schema/OrderQueue/OrderQueue";
import { OrderQueueContentInput } from "../../schema/OrderQueue/OrderQueueInput";

export const ProcessOrderQueue = gql`
  ${OrderQueueContentFragment}
  mutation ProcessOrderQueue($contents: [OrderQueueContentInput!]!) {
    processOrderQueue(contents: $contents) {
      contents {
        ...OrderQueueContentFragment
      }
    }
  }
`;

export interface ProcessOrderQueueArgs {
  contents: OrderQueueContentInput[];
}

export interface ProcessOrderQueueRes {
  processOrderQueue: OrderQueue;
}

export const useOrderQueueProcess = getMutationHook<
  ProcessOrderQueueRes,
  ProcessOrderQueueArgs
>(ProcessOrderQueue);
