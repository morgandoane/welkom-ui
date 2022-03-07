import { AppFragment } from './../../types';
import { TinyCompanyFragment } from './../Company/Company';
import { Identified } from './../Base/Base';
import {
    UploadEnabled,
    UploadEnabledFragment,
} from './../UploadEnabled/UploadEnabled';
import { TinyCompany } from '../Company/Company';
import { gql } from '@apollo/client';

export interface Itinerary extends UploadEnabled {
    code: string | null;
    carrier: TinyCompany | null;
    commissioned_by: TinyCompany;
}

export interface TinyItinerary extends Identified {
    code: string | null;
    carrier: TinyCompany | null;
    commissioned_by: TinyCompany;
}

export const ItineraryFragment = new AppFragment(
    gql`
        fragment ItineraryFragment on Itinerary {
            ...UploadEnabledFragment
            code
            carrier {
                ...TinyCompanyFragment
            }
            commissioned_by {
                ...TinyCompanyFragment
            }
        }
    `,
    [UploadEnabledFragment, TinyCompanyFragment]
);

export const TinyItineraryFragment = new AppFragment(
    gql`
        fragment TinyItineraryFragment on Itinerary {
            _id
            code
            carrier {
                ...TinyCompanyFragment
            }
            commissioned_by {
                ...TinyCompanyFragment
            }
        }
    `,
    [TinyCompanyFragment]
);
