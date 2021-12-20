import { gql } from "@apollo/client";

export const OrderFragment = gql`
  fragment OrderFragment on Order {
    ...BaseFragment
    code
    customer {
      _id
      name
    }
    vendor {
      _id
      name
    }
    contents {
      item {
        _id
        english
        spanish
      }
      unit {
        _id
        english
        spanish
        english_plural
        spanish_plural
      }
      quantity
      location {
        _id
        label
        address {
          line_1
          line_2
          city
          state
          postal
          country
          coordinate {
            lon
            lat
          }
        }
      }
      due
    }
  }
`;
