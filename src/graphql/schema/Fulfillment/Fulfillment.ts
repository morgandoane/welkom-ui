import { BaseFragment } from './../../fragments/BaseFragment';
import { BolItemContent } from './../Content/Content';
import { BolSignature } from './../Bol/Bol';
import { Verified } from './../Verified/Verified';
import { AppFile } from './../AppFile/AppFile';
import { gql } from '@apollo/client';
import { TinyLocation } from './../../queries/locations/useTinyLocations';
import { TinyCompany } from './../Company/Company';
import { TinyItem } from './../Item/Item';
import { Lot } from '../Lot/Lot';

export enum FulfillmentType {
    Shipment = 'Shipment',
    Receipt = 'Receipt',
}

export interface FulfillmentBol {
    _id: string;
    code?: string | null;
    seal?: string | null;
    file?: AppFile | null;
    from: {
        date: Date;
        company: TinyCompany;
    };
    to: {
        date: Date;
        company: TinyCompany;
    };
    signatures: BolSignature[];
    contents: BolItemContent[];
    itinerary: {
        _id: string;
        code: string;
        carrier: TinyCompany;
        orders: {
            _id: string;
            code: string;
        }[];
    };
}

export interface Fulfillment extends Verified {
    type: FulfillmentType;
    lots: Lot[];
    items: TinyItem[];
    company: TinyCompany;
    location: TinyLocation;
    bol: FulfillmentBol;
    files: AppFile[];
}

export interface TinyFulfillment {
    _id: string;
    deleted: boolean;
    type: FulfillmentType;
    items: TinyItem[];
    location: TinyLocation;
}

export const FulfillmentFragment = gql`
    fragment FulfillmentFragment on Fulfillment {
        ...BaseFragment
        files {
            ...AppFileFragment
        }
        verification {
            ...VerificationFragment
        }
        type
        bol {
            _id
            code
            seal
            itinerary {
                _id
                code
                carrier {
                    _id
                    name
                }
                orders {
                    _id
                    code
                }
            }
            from {
                date
                company {
                    _id
                    name
                }
            }
            to {
                date
                company {
                    _id
                    name
                }
            }
            file {
                ...AppFileFragment
            }
            signatures {
                profile {
                    user_id
                    picture
                    name
                    email
                    given_name
                    family_name
                }
                fulfillment_type
                confidence
            }
            contents {
                quantity
                item {
                    _id
                    unit_class
                    english
                    spanish
                }
                unit {
                    _id
                    class
                    english
                    spanish
                    english_plural
                    spanish_plural
                    base_per_unit
                }
            }
        }
        lots {
            ...BaseFragment
            code
            quality_check_responses {
                qualityCheck {
                    _id
                    item {
                        _id
                        unit_class
                        english
                        spanish
                    }
                    prompt {
                        type
                        phrase
                        valid_boolean
                        valid_range {
                            min
                            max
                        }
                    }
                }
                response
                passed
            }
            item {
                _id
                unit_class
                english
                spanish
            }
            location {
                _id
                label
                address {
                    city
                }
                company {
                    _id
                    name
                }
            }
            company {
                _id
                name
            }
            contents {
                quantity
                unit {
                    _id
                    class
                    english
                    spanish
                    english_plural
                    spanish_plural
                    base_per_unit
                }
                lot {
                    _id
                    code
                    company {
                        _id
                        name
                    }
                }
            }
            expenses {
                _id
                amount
            }
        }
        items {
            _id
            unit_class
            english
            spanish
        }
        company {
            _id
            name
        }
        location {
            _id
            label
            address {
                city
            }
            company {
                _id
                name
            }
        }
        _id
    }
`;
