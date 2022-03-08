import { BaseFragment } from './../Base/Base';
import { CreateUnitInput } from '../../inputsTypes';
import { Unit, UnitFragment } from './Unit';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { NamesPluralFragment } from '../Names/Names';

export const CreateUnitMutation = gql`
    ${UnitFragment._document}
    ${BaseFragment._document}
    ${TinyProfileFragment._document}
    ${NamesPluralFragment._document}
    mutation CreateUnitMutation($data: CreateUnitInput!) {
        createUnit(data: $data) {
            ...UnitFragment
        }
    }
`;

export const useUnitCreation = getMutationHook<
    { createUnit: Unit },
    { data: CreateUnitInput }
>(CreateUnitMutation);
