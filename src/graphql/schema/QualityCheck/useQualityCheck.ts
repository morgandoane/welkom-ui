import { TinyItemFragment } from './../Item/Item';
import { QualityCheck, QualityCheckFragment } from './QualityCheck';
import { getAtomicQueryHook } from '../../types';
import { gql } from '@apollo/client';
import { TinyProfileFragment } from '../Profile/Profile';
import { BaseFragment } from '../Base/Base';
import { NamesFragment } from '../Names/Names';

export const QualityCheckQuery = gql`
    ${QualityCheckFragment._document}
    ${BaseFragment._document}
    ${TinyProfileFragment._document}
    ${TinyItemFragment._document}
    ${NamesFragment._document}
    query QualityCheckQuery($id: ObjectId!) {
        qualityCheck(id: $id) {
            ...QualityCheckFragment
        }
    }
`;

export const useQualityCheck =
    getAtomicQueryHook<{ qualityCheck: QualityCheck }>(QualityCheckQuery);
