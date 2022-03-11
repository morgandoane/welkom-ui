import { BolContentFragment } from './../BolContent/BolContent';
import { Identified } from './../Base/Base';
import { TinyLocation, TinyLocationFragment } from './../Location/Location';
import { BolContent } from '../BolContent/BolContent';
import { AppFragment } from '../../types';
import { gql } from '@apollo/client';

export interface OrderAppointment extends Identified {
    contents: BolContent[];
    date: Date;
    location: TinyLocation;
    deleted: boolean;
}

export const OrderAppointmentFragment = new AppFragment(
    gql`
        fragment OrderAppointmentFragment on OrderAppointment {
            contents {
                ...BolContentFragment
            }
            date
            location {
                ...TinyLocationFragment
            }
            deleted
        }
    `,
    [BolContentFragment, TinyLocationFragment]
);
