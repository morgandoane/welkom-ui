import {
  SignedUrl,
  SignedUrlCategory,
  SignedUrlType,
} from "./../../schema/SignedUrl/SignedUrl";
import {
  gql,
  LazyQueryHookOptions,
  QueryHookOptions,
  QueryResult,
  QueryTuple,
  useLazyQuery,
  useQuery,
} from "@apollo/client";

export const SignedUrls = gql`
  query SignedUrls(
    $identifier: String!
    $category: SignedUrlCategory!
    $type: SignedUrlType!
    $filenames: [String!]!
  ) {
    signedUrls(
      identifier: $identifier
      category: $category
      type: $type
      filenames: $filenames
    ) {
      url
      expires
      type
      filename
    }
  }
`;

export interface SignedUrlRes {
  signedUrls: SignedUrl[];
}

export interface SignedUrlArgs {
  identifier: string;
  category: SignedUrlCategory;
  type: SignedUrlType;
  filenames: string[];
}

export const useSignedUrls = (
  options?: QueryHookOptions<SignedUrlRes, SignedUrlArgs>
): QueryResult<SignedUrlRes, SignedUrlArgs> => useQuery(SignedUrls, options);

export const useLazySignedUrls = (
  options?: LazyQueryHookOptions<SignedUrlRes, SignedUrlArgs>
): QueryTuple<SignedUrlRes, SignedUrlArgs> => useLazyQuery(SignedUrls, options);
