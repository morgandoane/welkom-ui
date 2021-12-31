import { BaseFragment } from "./../../fragments/BaseFragment";
import { TinyCompany } from "./../Company/Company";
import { gql } from "@apollo/client";
import { Base } from "../Base/Base";
import { Bol } from "../Bol/Bol";

export interface Itinerary extends Base {
  code: string;
  bols: Bol[];
  carrier?: TinyCompany | null;
}

export const ItineraryFragment = gql`
  fragment ItineraryFragment on Itinerary {
    ...BaseFragment
    code
    carrier {
      _id
      name
    }
    bols {
      ...BolFragment
    }
  }
`;
