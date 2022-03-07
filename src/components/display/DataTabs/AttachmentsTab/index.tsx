import { DocumentNode } from '@apollo/client';
import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { UploadEnabled } from '../../../../graphql/schema/UploadEnabled/UploadEnabled';
import Message from '../../../feedback/Message';
import Attachments from '../../../Inputs/Attachments';

export interface AttachmentsTabProps<T extends UploadEnabled> {
    data: T;
    refetchQueries: DocumentNode[];
}

const AttachmentsTab = <T extends UploadEnabled>(
    props: AttachmentsTabProps<T>
): ReactElement => {
    const { data, refetchQueries } = props;

    return (
        <Box sx={{ height: '100%' }}>
            <Attachments refetchQueries={refetchQueries}>{data}</Attachments>
        </Box>
    );
};

export default AttachmentsTab;
