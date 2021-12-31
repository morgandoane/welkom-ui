import { gql } from "@apollo/client";
import { TinyLocation } from "./../../queries/locations/useTinyLocations";
import { TinyCompany } from "./../Company/Company";
import { Base } from "../Base/Base";
import { Fulfillment } from "../Fulfillment/Fulfillment";
import { BolItemContent } from "../Content/Content";

export enum BolStatus {
  Pending,
  Partial,
  Complete,
}

export interface BolAppointment {
  location?: TinyLocation | null;
  company: TinyCompany;
  date: Date;
}

export interface BolOrder {
  _id: string;
  code: string;
  created_by: {
    email?: string | null;
    name?: string | null;
    user_id: string;
    picture?: string | null;
  };
}

export interface BolItinerary {
  _id: string;
  code: string;
  carrier?: TinyCompany | null;
}

export interface Bol extends Base {
  itinerary: BolItinerary;
  code: string;
  order: BolOrder;
  status: BolStatus;
  from: BolAppointment;
  to: BolAppointment;
  contents: BolItemContent[];
  shipments?: Fulfillment[];
  receipts?: Fulfillment[];
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
    }
    order {
      _id
      code
      created_by {
        email
        name
        user_id
        picture
      }
    }
    date_created
    deleted
    status
    code
    from {
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
  }
`;
