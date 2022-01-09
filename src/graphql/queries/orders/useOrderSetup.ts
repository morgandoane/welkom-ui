import { TinyLocation } from './../locations/useTinyLocations';
import { TinyItem } from './../../schema/Item/Item';
import { TinyCompany } from './../../schema/Company/Company';
import { TinyProfile } from './../../schema/Profile/Profile';
import { TinyUnit } from './../../schema/Unit/Unit';
import { PaginateArg, Pagination } from './../../schema/Pagination/Pagination';
import { gql, useQuery } from '@apollo/client';

export const OrderSetup = gql`
    query OrderSetup($skip: Float!, $take: Float!) {
        companies(filter: { skip: $skip, take: $take }) {
            count
            items {
                _id
                name
            }
        }
        items(filter: { skip: $skip, take: $take }) {
            count
            items {
                _id
                english
                spanish
                unit_class
            }
        }
        locations(filter: { skip: $skip, take: $take }) {
            count
            items {
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
        }
        profiles(filter: { skip: $skip, take: $take }) {
            count
            items {
                user_id
                email
                name
            }
        }
        units(filter: { skip: $skip, take: $take }) {
            count
            items {
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
`;

interface OrderSetupRes {
    companies: Pagination<TinyCompany>;
    items: Pagination<TinyItem>;
    locations: Pagination<TinyLocation>;
    profiles: Pagination<TinyProfile>;
    units: Pagination<TinyUnit>;
}

type OrderSetupArgs = PaginateArg;

const useOrderSetupHook = () =>
    useQuery<OrderSetupRes, OrderSetupArgs>(OrderSetup, {
        variables: {
            skip: 0,
            take: 200,
        },
    });

export const useOrderSetup = (): {
    loading: boolean;
    data: {
        companies: TinyCompany[];
        items: TinyItem[];
        profiles: TinyProfile[];
        locations: TinyLocation[];
        units: TinyUnit[];
    };
} => {
    const { data: setupData, loading } = useOrderSetupHook();

    return {
        loading,
        data: {
            companies: setupData ? setupData.companies.items : [],
            items: setupData ? setupData.items.items : [],
            locations: setupData ? setupData.locations.items : [],
            profiles: setupData ? setupData.profiles.items : [],
            units: setupData ? setupData.units.items : [],
        },
    };
};
