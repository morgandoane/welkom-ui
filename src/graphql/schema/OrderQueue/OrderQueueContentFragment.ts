import { gql } from "@apollo/client";

export const OrderQueueContentFragment = gql`
  fragment OrderQueueContentFragment on OrderQueueContent {
    order_code
    vendor {
      _id
      name
    }
    vendor_location {
      _id
      label
      address {
        city
      }
      company {
        _id
        name
      }
    }
    item {
      _id
      unit_class
      english
      spanish
    }
    unit {
      _id
      class
      english
      spanish
      english_plural
      spanish_plural
      base_per_unit
    }
    quantity
    location {
      _id
      label
      address {
        city
      }
      company {
        _id
        name
      }
    }
    date
  }
`;
