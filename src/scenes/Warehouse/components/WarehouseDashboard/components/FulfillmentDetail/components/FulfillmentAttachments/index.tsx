import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { Fulfillment } from '../../../../../../../../graphql/schema/Fulfillment/Fulfillment';
import FileUpload from '../../../../../../../../components/FileUpload';
import { useUploads } from '../../../../../../../../providers/UploadProvider';
import Files from '../../../../../../../../components/Files';
import { StorageBucket } from '../../../../../../../../graphql/schema/SignedUrl/SignedUrl';
import { FulfillmentQuery } from '../../../../../../../../graphql/queries/fulfillment/useFulfillment';

export interface FulfillmentAttachments {
    fulfillment: Fulfillment;
    refetch: () => void;
}

const FulfillmentAttachments = (
    props: FulfillmentAttachments
): ReactElement => {
    const { fulfillment, refetch } = props;
    const { enqueue } = useUploads(refetch);

    return (
        <Box sx={{ height: '90%', overflow: 'auto' }}>
            <Files
                files={fulfillment.files}
                prefix={fulfillment._id}
                storage_category={StorageBucket.Attachments}
                refetchQueries={[FulfillmentQuery]}
            />
            <FileUpload
                fab
                onChange={(files) =>
                    enqueue(
                        files.map((file) => ({
                            file,
                            prefix: fulfillment._id,
                            storage_category: StorageBucket.Attachments,
                        }))
                    )
                }
            />
        </Box>
    );
};

export default FulfillmentAttachments;
