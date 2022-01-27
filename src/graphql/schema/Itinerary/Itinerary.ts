import { TinyOrder } from './../../queries/orders/useOrders';
import { TinyCompany } from './../Company/Company';
import { gql } from '@apollo/client';
import { Base } from '../Base/Base';
import { Bol } from '../Bol/Bol';
import { AppFile } from '../AppFile/AppFile';

export interface Itinerary extends Base {
    code: string;
    bols: Bol[];
    carrier?: TinyCompany | null;
    orders: TinyOrder[];
    files: AppFile[];
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
        orders {
            ...TinyOrderFragment
        }
        files {
            ...AppFileFragment
        }
    }
`;
