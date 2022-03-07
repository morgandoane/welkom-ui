import { AppFragment } from './../../types';
import { gql } from '@apollo/client';
import { Identified } from './../Base/Base';

export interface Contact extends Identified {
    name: string;
    email: string;
    cc_on_order: boolean;
    email_on_order: boolean;
    title: string | null | undefined;
}

export const ContactFragment = new AppFragment(
    gql`
        fragment ContactFragment on Contact {
            _id
            name
            email
            title
            email_on_order
            cc_on_order
        }
    `,
    []
);
