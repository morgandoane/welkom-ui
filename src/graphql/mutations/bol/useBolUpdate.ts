import { UpdateBolInput } from '../../schema/Bol/BolInput';
import { Bol, BolFragment } from '../../schema/Bol/Bol';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';

export const UpdateBol = gql`
    ${BolFragment}
    mutation UpdateBol($id: ObjectId!, $data: UpdateBolInput!) {
        updateBol(id: $id, data: $data) {
            ...BolFragment
        }
    }
`;

export interface UpdateBolRes {
    updateBol: Bol;
}

export interface UpdateBolArgs {
    id: string;
    data: UpdateBolInput;
}

export const useBolUpdate = getMutationHook<UpdateBolRes, UpdateBolArgs>(
    UpdateBol
);
