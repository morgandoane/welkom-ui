import { StorageBucket } from './../../../components/Inputs/Attachments/components/FileUpload/index';
import { gql } from '@apollo/client';
import { getQueryHook } from './../../types';

const UrnQuery = gql`
    query UrnQuery(
        $filename: String!
        $identifier: String!
        $bucket: StorageBucket!
    ) {
        file(filename: $filename, identifier: $identifier, bucket: $bucket) {
            id
            viewer_urn {
                urn
                token
            }
        }
    }
`;

export interface UrnQueryArgs {
    filename: string;
    identifier: string;
    bucket: StorageBucket;
}

export interface UrnQueryRes {
    file: {
        id: string;
        viewer_urn: {
            urn: string;
            token: string;
        };
    };
}

export const useAppFileUrn = getQueryHook<UrnQueryRes, UrnQueryArgs>(UrnQuery);
