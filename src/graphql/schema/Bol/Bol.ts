import { FulfillmentFragment } from "./../Fulfillment/Fulfillment";
import { BaseFragment } from "./../../fragments/BaseFragment";
import { gql } from "@apollo/client";
import { TinyLocation } from "./../../queries/locations/useTinyLocations";
import { TinyCompany } from "./../Company/Company";
import { Base } from "../Base/Base";
import { Fulfillment } from "../Fulfillment/Fulfillment";
import { BolItemContent } from "../Content/Content";

export enum BolStatus {
  Pending = "Pending",
  Partial = "Partial",
  Complete = "Complete",
}

export interface BolAppointment {
  _id: string;
  location?: TinyLocation | null;
  company: TinyCompany;
  date: Date;
}

export interface BolOrder {
  _id: string;
  code: string;
}

export interface BolItinerary {
  _id: string;
  code: string;
  carrier?: TinyCompany | null;
  orders: BolOrder[];
}

export interface Bol extends Base {
  itinerary: BolItinerary;
  code?: string | null;
  status: BolStatus;
  from: BolAppointment;
  to: BolAppointment;
  contents: BolItemContent[];
  shipments: Fulfillment[];
  receipts: Fulfillment[];
  orders: BolOrder[];
}

export interface TinyBol {
  _id: string;
  code: string;
  date_created: Date;
  deleted: boolean;
  status: BolStatus;
  from: BolAppointment;
  to: BolAppointment;
  contents: BolItemContent[];
}

export const BolFragment = gql`
  fragment BolFragment on Bol {
    _id
    itinerary {
      _id
      code
      carrier {
        _id
        name
      }
      orders {
        _id
        code
      }
    }
    orders {
      _id
      code
    }
    date_created
    deleted
    status
    code
    from {
      _id
      date
      company {
        _id
        name
      }
      location {
        _id
        label
        address {
          city
        }
      }
    }
    to {
      _id
      date
      company {
        _id
        name
      }
      location {
        _id
        label
        address {
          city
        }
      }
    }
    contents {
      fulfillment_percentage
      quantity
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
    }
    shipments {
      ...FulfillmentFragment
    }
    receipts {
      ...FulfillmentFragment
    }
  }
`;
