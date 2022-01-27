import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { Company } from '../../../../../../../../graphql/schema/Company/Company';
import FileUpload from '../../../../../../../../components/FileUpload';
import { useUploads } from '../../../../../../../../providers/UploadProvider';
import Files from '../../../../../../../../components/Files';
import { StorageBucket } from '../../../../../../../../graphql/schema/SignedUrl/SignedUrl';
import { CompanyQuery } from '../../../../../../../../graphql/queries/companies/useCompany';
import { Itinerary } from '../../../../../../../../graphql/schema/Itinerary/Itinerary';
import { ItineraryQuery } from '../../../../../../../../graphql/queries/itinerary/useItinerary';

export interface ItineraryDocumentsProps {
    itinerary: Itinerary;
    refetch: () => void;
}

const ItineraryDocuments = (props: ItineraryDocumentsProps): ReactElement => {
    const { itinerary, refetch } = props;
    const { enqueue } = useUploads(refetch);

    return (
        <Box sx={{ height: '90%', overflow: 'auto' }}>
            <Files
                files={itinerary.files}
                prefix={itinerary._id}
                storage_category={StorageBucket.Documents}
                refetchQueries={[ItineraryQuery]}
            />
            <FileUpload
                fab
                onChange={(files) =>
                    enqueue(
                        files.map((file) => ({
                            file,
                            prefix: itinerary._id,
                            storage_category: StorageBucket.Documents,
                        }))
                    )
                }
            />
        </Box>
    );
};

export default ItineraryDocuments;
