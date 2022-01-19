import { gql } from '@apollo/client';
import { Base } from './../Base/Base';

export interface Contact extends Base {
    given_name: string;
    family_name: string;
    email?: string | null;
    email_on_order?: boolean | null;
    cc_on_order?: boolean | null;
    phone?: string | null;
}

export interface TinyContact {
    _id: string;
    given_name: string;
    family_name: string;
    email?: string | null;
    email_on_order?: boolean | null;
    cc_on_order?: boolean | null;
    phone?: string | null;
    company: { _id: string };
}

export const TinyContactFragment = gql`
    fragment TinyContactFragment on Contact {
        _id
        given_name
        family_name
        email
        email_on_order
        cc_on_order
        phone
        company {
            _id
        }
    }
`;
