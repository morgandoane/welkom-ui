import { OrderQueueContentFragment } from "../../schema/OrderQueue/OrderQueueContentFragment";
import { gql } from "@apollo/client";
import { getQueryHook } from "../../types";
import { OrderQueue } from "../../schema/OrderQueue/OrderQueue";

const OrderQueueQuery = gql`
  ${OrderQueueContentFragment}
  query OrderQueueQuery {
    orderQueue {
      _id
      contents {
        ...OrderQueueContentFragment
      }
    }
  }
`;

export interface OrderQueueRes {
  orderQueue: OrderQueue;
}

export const useOrderQueue = getQueryHook<OrderQueueRes>(OrderQueueQuery);
