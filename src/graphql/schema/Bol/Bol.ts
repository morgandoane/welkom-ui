import { gql } from '@apollo/client';
import { Appointment } from '../Appointment/Appointment';
import { Base, TinyBase } from '../Base/Base';
import { Content } from '../Content/Content';
import { Expense } from '../Expense/Expense';
import { BolItinerary } from '../Itinerary/Itinerary';
import { BolDocumentation } from './BolDocumentation';

export interface Bol extends Base {
    itinerary: BolItinerary;
    from: Appointment;
    to: Appointment;
    contents: Content[];
    documentation: BolDocumentation | null;
    itinerary_expenses: Expense[];
    lot_codes: string[];
}

export interface TinyBol extends TinyBase {
    itinerary: BolItinerary;
    from: Appointment;
    to: Appointment;
    contents: Content[];
    documentation: BolDocumentation | null;
    itinerary_expenses: Expense[];
    lot_codes: string[];
}

export type FulfillmentBol = TinyBol;

export const BolFragment = gql`
    fragment BolFragment on Bol {
        ...BaseFragment
        itinerary {
            ...TinyItineraryFragment
        }
        from {
            ...AppointmentFragment
        }
        to {
            ...AppointmentFragment
        }
        contents {
            ...BolContentFragment
        }
        documentation {
            ...BolDocumentationFragment
        }
        itinerary_expenses {
            ...ExpenseFragment
        }
        lot_codes
    }
`;

export const TinyBolFragment = gql`
    fragment TinyBolFragment on Bol {
        ...TinyBaseFragment
        itinerary {
            ...TinyItineraryFragment
        }
        from {
            ...AppointmentFragment
        }
        to {
            ...AppointmentFragment
        }
        contents {
            ...BolContentFragment
        }
        documentation {
            ...BolDocumentationFragment
        }
        itinerary_expenses {
            ...ExpenseFragment
        }
        lot_codes
    }
`;
