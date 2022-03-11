import { Identified } from './../Base/Base';
import { TinyCompany, TinyCompanyFragment } from './../Company/Company';
import { Approval } from './../Approval/Approval';
import {
    OrderAppointment,
    OrderAppointmentFragment,
} from './../OrderAppointment/OrderAppointment';
import {
    UploadEnabled,
    UploadEnabledFragment,
} from './../UploadEnabled/UploadEnabled';
import { AppFragment } from '../../types';
import { gql } from '@apollo/client';

export interface Order extends UploadEnabled {
    po: string;
    customer: TinyCompany;
    vendor: TinyCompany;
    appointments: OrderAppointment[];
    approval?: Approval;
}

export interface TinyOrder extends Identified {
    po: string;
    customer: TinyCompany;
    vendor: TinyCompany;
    appointments: OrderAppointment[];
    approval?: Approval;
}

export const OrderFragment = new AppFragment(
    gql`
        fragment OrderFragment on Order {
            ...UploadEnabledFragment
            po
            customer {
                ...TinyCompanyFragment
            }
            vendor {
                ...TinyCompanyFragment
            }
            appointments {
                ...OrderAppointmentFragment
            }
        }
    `,
    [UploadEnabledFragment, TinyCompanyFragment, OrderAppointmentFragment]
);

export const TinyOrderFragment = new AppFragment(
    gql`
        fragment TinyOrderFragment on Order {
            _id
            po
            customer {
                ...TinyCompanyFragment
            }
            vendor {
                ...TinyCompanyFragment
            }
            appointments {
                ...OrderAppointmentFragment
            }
        }
    `,
    [UploadEnabledFragment]
);
