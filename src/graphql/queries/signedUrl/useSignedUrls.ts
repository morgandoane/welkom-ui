import { SignedUrl } from "./../../schema/SignedUrl/SignedUrl";
import { gql, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";
import { StorageBucket } from "../../schema/SignedUrl/SignedUrl";

export const SignedUrls = gql`
  query SignedUrls($configs: [SignedUrlConfig!]!) {
    signedUrls(configs: $configs) {
      url
    }
  }
`;

export enum SignedUrlAction {
  write = "write",
  read = "read",
  delete = "delete",
  resumable = "resumable",
}

export interface SignedUrlConfig {
  category: StorageBucket;
  prefix: string;
  name: string;
  action: SignedUrlAction;
}

export interface SignedUrlsArgs {
  configs: SignedUrlConfig[];
}

export interface SignedUrlsRes {
  signedUrls: SignedUrl[];
}

export const useSignedUrls = (
  options?: QueryHookOptions<SignedUrlsRes, SignedUrlsArgs>
): QueryResult<SignedUrlsRes, SignedUrlsArgs> => useQuery(SignedUrls, options);
