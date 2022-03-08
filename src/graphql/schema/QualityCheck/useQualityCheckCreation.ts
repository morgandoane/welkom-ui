import { NamesFragment } from './../Names/Names';
import { CreateQualityCheckInput } from '../../inputsTypes';
import { QualityCheck, QualityCheckFragment } from './QualityCheck';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { TinyItemFragment } from '../Item/Item';
import { BaseFragment } from '../Base/Base';

export const CreateQualityCheckMutation = gql`
    ${QualityCheckFragment._document}
    ${BaseFragment._document}
    ${TinyProfileFragment._document}
    ${TinyItemFragment._document}
    ${NamesFragment._document}
    mutation CreateQualityCheckMutation($data: CreateQualityCheckInput!) {
        createQualityCheck(data: $data) {
            ...QualityCheckFragment
        }
    }
`;

export const useQualityCheckCreation = getMutationHook<
    { createQualityCheck: QualityCheck },
    { data: CreateQualityCheckInput }
>(CreateQualityCheckMutation);
