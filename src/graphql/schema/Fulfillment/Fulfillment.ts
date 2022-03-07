import { AppFragment } from './../../types';
import { TinyBolFragment } from './../Bol/Bol';
import { Base, BaseFragment } from './../Base/Base';
import { FulfillmentContent } from './../FulfillmentContent/FulfillmentContent';
import { UploadEnabled } from './../UploadEnabled/UploadEnabled';
import { TinyBol } from '../Bol/Bol';
import { FulfillmentType } from '../../inputsTypes';
import { gql } from '@apollo/client';

export interface Fulfillment extends UploadEnabled {
    type: FulfillmentType;
    bol: TinyBol;
    contents: FulfillmentContent[];
}

export interface TinyFulfillment extends Base {
    type: FulfillmentType;
    bol: TinyBol;
    contents: FulfillmentContent[];
}

export const TinyFulfillmentFragment = new AppFragment(
    gql`
        fragment TinyFulfillmentFragment on Fulfillment {
            ...BaseFragment
            type
            bol {
                ...TinyBolFragment
            }
            contents {
                
            }
        }
    `,
    []
);
