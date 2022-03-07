import {
    DocumentNode,
    gql,
    useApolloClient,
    useLazyQuery,
    useQuery,
} from '@apollo/client';
import { CircularProgress, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { useFileUpload } from '../../../../../hooks/useFileUpload';
import { Animation } from '../../../../../media/Animation';

export enum StorageBucket {
    ldbbakery_attachments = 'ldbbakery_attachments',
    ldbbakery_images = 'ldbbakery_images',
    ldbbakery_profiles = 'ldbbakery_profiles',
}

export const SignedUrlQuery = gql`
    query SignedUrlQuery(
        $bucket: StorageBucket!
        $identifier: String!
        $filename: String!
    ) {
        signedUrl(
            bucket: $bucket
            identifier: $identifier
            filename: $filename
        ) {
            url
            timestamp
        }
    }
`;

export interface SignedUrlArgs {
    bucket: StorageBucket;
    identifier: string;
    filename: string;
}

export interface SignedUrlRes {
    signedUrl: {
        url: string;
        timestamp: Date;
    };
}

export interface FileUploadProps {
    uuid: string;
    folder: string;
    file: File;
    state: 'pending' | 'processed';
    onProcessed: (uuid: string) => void;
    ready: boolean;
    refetchQueries?: DocumentNode[];
}

const FileUpload = (props: FileUploadProps): ReactElement => {
    const {
        uuid: id,
        folder,
        file,
        state,
        onProcessed,
        ready,
        refetchQueries,
    } = props;

    const client = useApolloClient();

    const onComplete = async () => {
        onProcessed(id);
        if (refetchQueries)
            await client.refetchQueries({
                include: refetchQueries,
            });
    };

    const [
        upload,
        {
            loading: uploadLoading,
            error: uploadError,
            progress,
            data: uploadData,
        },
    ] = useFileUpload({
        onComplete,
    });

    const {
        data,
        error: urlError,
        loading: urlLoading,
    } = useQuery<SignedUrlRes, SignedUrlArgs>(SignedUrlQuery, {
        onCompleted: ({ signedUrl }) => {
            upload(file, signedUrl.url, new Date(signedUrl.timestamp));
        },
        variables: {
            bucket: StorageBucket.ldbbakery_attachments,
            identifier: folder,
            filename: file.name,
        },
        skip: !ready,
        fetchPolicy: 'network-only',
    });

    const loading = uploadLoading || urlLoading;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                }}
            >
                {!loading && state == 'processed' && (
                    <Animation
                        loop={false}
                        style={{ height: 38 }}
                        type="success"
                    />
                )}
                {loading && (
                    <CircularProgress sx={{ maxHeight: 24, maxWidth: 24 }} />
                )}
            </Box>
            <Box p={1.5}>
                <Typography>{file.name}</Typography>
            </Box>
        </Box>
    );
};

export default FileUpload;
