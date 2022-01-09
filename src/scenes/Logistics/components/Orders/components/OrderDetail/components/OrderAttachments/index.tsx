import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { Order } from '../../../../../../../../graphql/schema/Order/Order';
import FileUpload from '../../../../../../../../components/FileUpload';
import { useUploads } from '../../../../../../../../providers/UploadProvider';
import Files from '../../../../../../../../components/Files';
import { StorageBucket } from '../../../../../../../../graphql/schema/SignedUrl/SignedUrl';
import { OrderQuery } from '../../../../../../../../graphql/queries/orders/Order';
import Info from '../../../../../../../../components/Info';

export interface OrderDocumentsProps {
    order: Order;
    refetch: () => void;
}

const OrderAttachments = (props: OrderDocumentsProps): ReactElement => {
    const { order, refetch } = props;
    const { enqueue } = useUploads(props.refetch);

    return (
        <Box
            sx={{
                height: '95%',
                overflow: 'auto',
                paddingTop: 2,
            }}
        >
            <Info maxWidth={340}>
                Orders can have a series of attached documents. Upload any
                relevant documents here.
            </Info>
            <Files
                files={order.files}
                prefix={order._id}
                storage_category={StorageBucket.Documents}
                refetchQueries={[OrderQuery]}
            />
            <FileUpload
                fab
                onChange={(files) =>
                    enqueue(
                        files.map((file) => ({
                            file,
                            prefix: order._id,
                            storage_category: StorageBucket.Documents,
                        }))
                    )
                }
            />
        </Box>
    );
};

export default OrderAttachments;
