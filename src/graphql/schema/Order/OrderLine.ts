import { gql } from '@apollo/client';
import { Appointment } from '../Appointment/Appointment';
import { Content } from '../Content/Content';

export interface OrderLine {
    appointment: Appointment;
    contents: Content[];
}

export const OrderLineFragment = gql`
    fragment OrderLineFragment on OrderLine {
        appointment {
            ...AppointmentFragment
        }
        contents {
            ...ContentFragment
        }
    }
`;
