import { gql } from "@apollo/client";

export enum PromptType {
  Boolean = "Boolean",
  Number = "Number",
  Text = "Text",
}

export interface Range {
  min: number;
  max: number;
}

export interface Prompt {
  type: PromptType;
  phrase: string;
  valid_boolean?: boolean | null;
  valid_range?: Range | null;
}

export const PromptFragment = gql`
  fragment PromptFragment on Prompt {
    type
    valid_boolean
    phrase
    valid_range {
      min
      max
    }
  }
`;
