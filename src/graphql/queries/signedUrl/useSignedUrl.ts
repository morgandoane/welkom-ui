import { SignedUrl } from "../../schema/SignedUrl/SignedUrl";
import { gql, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";
import { SignedUrlConfig } from "./useSignedUrls";

export const SignedUrlQuery = gql`
  query SignedUrl($config: SignedUrlConfig!) {
    signedUrl(config: $config) {
      url
    }
  }
`;

export interface SignedUrlArgs {
  config: SignedUrlConfig;
}

export interface SignedUrlRes {
  signedUrl: SignedUrl;
}

export const useSignedUrl = (
  options?: QueryHookOptions<SignedUrlRes, SignedUrlArgs>
): QueryResult<SignedUrlRes, SignedUrlArgs> =>
  useQuery(SignedUrlQuery, options);
