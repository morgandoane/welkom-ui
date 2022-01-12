import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import Files from '../../../../../../../../components/Files';
import FileUpload from '../../../../../../../../components/FileUpload';
import { FulfillmentQuery } from '../../../../../../../../graphql/queries/fulfillment/useFulfillment';
import { Fulfillment } from '../../../../../../../../graphql/schema/Fulfillment/Fulfillment';
import { StorageBucket } from '../../../../../../../../graphql/schema/SignedUrl/SignedUrl';
import { useUploads } from '../../../../../../../../providers/UploadProvider';

export interface FulfillmentDocumentProps {
    fulfillment: Fulfillment;
    refetch: () => void;
}

const FulfillmentDocument = (props: FulfillmentDocumentProps): ReactElement => {
    const { fulfillment, refetch } = props;
    const { enqueue } = useUploads(refetch);

    const { file } = fulfillment.bol;

    return (
        <Box sx={{ height: '90%', overflow: 'auto' }}>
            <Files
                files={file ? [file] : []}
                prefix={fulfillment.bol._id}
                storage_category={StorageBucket.Profiles}
                refetchQueries={[FulfillmentQuery]}
            />
            {!file && (
                <FileUpload
                    fab
                    onChange={(files) =>
                        enqueue(
                            files.map((file) => ({
                                file,
                                prefix: fulfillment.bol._id,
                                storage_category: StorageBucket.Profiles,
                            }))
                        )
                    }
                />
            )}
        </Box>
    );
};

export default FulfillmentDocument;
