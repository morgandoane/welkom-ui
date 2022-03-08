import { BaseFragment } from './../Base/Base';
import { Unit, UnitFragment } from './Unit';
import { getAtomicQueryHook } from '../../types';
import { gql } from '@apollo/client';
import { TinyProfileFragment } from '../Profile/Profile';
import { NamesPluralFragment } from '../Names/Names';

export const UnitQuery = gql`
    ${UnitFragment._document}
    ${BaseFragment._document}
    ${TinyProfileFragment._document}
    ${NamesPluralFragment._document}
    query UnitQuery($id: ObjectId!) {
        unit(id: $id) {
            ...UnitFragment
        }
    }
`;

export const useUnit = getAtomicQueryHook<{ unit: Unit }>(UnitQuery);
