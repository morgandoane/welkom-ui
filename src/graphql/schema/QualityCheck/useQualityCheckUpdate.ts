import { UpdateQualityCheckInput } from '../../inputsTypes';
import { QualityCheck, QualityCheckFragment } from './QualityCheck';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { TinyItemFragment } from '../Item/Item';
import { BaseFragment } from '../Base/Base';
import { NamesFragment } from '../Names/Names';

export const UpdateQualityCheckMutation = gql`
    ${QualityCheckFragment._document}
    ${BaseFragment._document}
    ${TinyProfileFragment._document}
    ${TinyItemFragment._document}
    ${NamesFragment._document}
    mutation UpdateQualityCheckMutation(
        $id: ObjectId!
        $data: UpdateQualityCheckInput!
    ) {
        updateQualityCheck(id: $id, data: $data) {
            ...QualityCheckFragment
        }
    }
`;

export const useQualityCheckUpdate = getMutationHook<
    { updateQualityCheck: QualityCheck },
    { id: string; data: UpdateQualityCheckInput }
>(UpdateQualityCheckMutation);
