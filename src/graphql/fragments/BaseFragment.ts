import { BaseUnionFields } from './../../providers/ApolloProvider/index';
import { gql } from '@apollo/client';

const createBaseFragment = () => {
    let res = ``;

    for (const type of BaseUnionFields) {
        res += `
    ... on ${type} {
        _id
        deleted
        date_created
        date_modified
        modified_by {
          user_id
          name
          email
        }
        created_by {
          user_id
          name
          email
        }
      }
    `;
    }

    return res;
};

export const BaseFragment = gql(String.raw`
  fragment BaseFragment on BaseUnion {
    ${createBaseFragment()}
  }
`);
