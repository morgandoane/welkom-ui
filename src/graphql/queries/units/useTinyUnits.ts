import { TinyUnit } from './../../schema/Unit/Unit';
import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';
import { UnitFilter } from '../../schema/Unit/UnitFilter';
import { Pagination } from '../../schema/Pagination/Pagination';

export const TinyUnits = gql`
    query TinyUnits($filter: UnitFilter!) {
        units(filter: $filter) {
            count
            items {
                _id
                class
                english
                spanish
                english_plural
                spanish_plural
                base_per_unit
                created_by {
                    user_id
                    name
                    email
                    picture
                    given_name
                    family_name
                }
                modified_by {
                    user_id
                    name
                    email
                }
                date_modified
                date_created
            }
        }
    }
`;

export const useTinyUnits = (
    options?: QueryHookOptions<
        { units: Pagination<TinyUnit> },
        { filter: UnitFilter }
    >
): QueryResult<{ units: Pagination<TinyUnit> }, { filter: UnitFilter }> =>
    useQuery(TinyUnits, options);
