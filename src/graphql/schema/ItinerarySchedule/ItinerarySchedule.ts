import { gql } from '@apollo/client';
import { TinyCompany, TinyCompanyFragment } from './../Company/Company';
import { TinyLocation, TinyLocationFragment } from '../Location/Location';
import { TinyBol, TinyBolFragment } from '../Bol/Bol';
import { AppFragment } from '../../types';

export interface ItineraryScheduleStage {
    index: number;
    date: Date;
    company: TinyCompany;
    location: TinyLocation | null;
}

export interface ItinerarySchedulePath {
    bol: TinyBol;
    from_index: number;
    to_index: number;
}

export interface ItinerarySchedule {
    stages: ItineraryScheduleStage[];
    paths: ItinerarySchedulePath[];
}

export const ItineraryScheduleFragment = new AppFragment(
    gql`
        fragment ItineraryScheduleFragment on ItinerarySchedule {
            stages {
                index
                date
                company {
                    ...TinyCompanyFragment
                }
                location {
                    ...TinyLocationFragment
                }
            }
            paths {
                bol {
                    ...TinyBolFragment
                }
                from_index
                to_index
            }
        }
    `,
    [TinyCompanyFragment, TinyLocationFragment, TinyBolFragment]
);
