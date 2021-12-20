import { getLazyQueryHook, getQueryHook } from "./../../types";
import { Code, CodeType } from "./../../schema/Code/Code";
import { gql } from "@apollo/client";

export const CodeQuery = gql`
  query CodeQuery($type: CodeType!) {
    code(type: $type) {
      value
      date_generated
      type
    }
  }
`;

export interface CodeRes {
  code: Code;
}

export interface CodeArgs {
  type: CodeType;
}

export const useCode = getQueryHook<CodeRes, CodeArgs>(CodeQuery);
export const useLazyCode = getLazyQueryHook<CodeRes, CodeArgs>(CodeQuery);
