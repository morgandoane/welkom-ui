import { UpdateUnitInput } from '../../inputsTypes';
import { Unit, UnitFragment } from './Unit';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { BaseFragment } from '../Base/Base';
import { NamesPluralFragment } from '../Names/Names';

export const UpdateUnitMutation = gql`
    ${UnitFragment._document}
    ${BaseFragment._document}
    ${TinyProfileFragment._document}
    ${NamesPluralFragment._document}
    mutation UpdateUnitMutation($id: ObjectId!, $data: UpdateUnitInput!) {
        updateUnit(id: $id, data: $data) {
            ...UnitFragment
        }
    }
`;

export const useUnitUpdate = getMutationHook<
    { updateUnit: Unit },
    { id: string; data: UpdateUnitInput }
>(UpdateUnitMutation);
