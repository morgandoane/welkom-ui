import { gql } from '@apollo/client';
import { TinyBol } from '../../queries/bols/useTinyBols';
import { Base, TinyBase } from '../Base/Base';
import { Expense } from '../Expense/Expense';
import { ItineraryDocumentation } from './ItineraryDocumentation';

export interface Itinerary extends Base {
    documentation?: ItineraryDocumentation | null;
    expenses: Expense[];
    bols: TinyBol[];
}

export interface BolItinerary extends TinyBase {
    documentation?: ItineraryDocumentation | null;
    expenses: Expense[];
}

export interface TinyItinerary extends TinyBase {
    documentation?: ItineraryDocumentation | null;
    expenses: Expense[];
    bols: TinyBol[];
}

export const ItineraryFragment = gql`
    fragment ItineraryFragment on Itinerary {
        ...Base
        documentation {
            ...ItineraryDocumentationFragment
        }
        expenses {
            ...ExpenseFragment
        }
        bols {
            ...TinyBolFragment
        }
    }
`;

export const TinyItineraryFragment = gql`
    fragment TinyItineraryFragment on Itinerary {
        ...TinyBase
        documentation {
            ...ItineraryDocumentationFragment
        }
        expenses {
            ...ExpenseFragment
        }
        bols {
            ...TinyBolFragment
        }
    }
`;
