import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { AppFile } from '../../graphql/schema/AppFile/AppFile';
import { Dialog, LinearProgress } from '@mui/material';
import FilePreview from './components/FilePreview';
import { useFileDeletion } from '../../graphql/mutations/file/useFileDeletion';
import { StorageBucket } from '../../graphql/schema/SignedUrl/SignedUrl';
import { CompanyQuery } from '../../graphql/queries/companies/useCompany';

export interface FilesProps {
    files: AppFile[];
    prefix: string;
    storage_category: StorageBucket;
    refetchQueries?: any[];
}

const Files = (props: FilesProps): ReactElement => {
    const { files, storage_category, prefix, refetchQueries } = props;

    const [view, setView] = React.useState<'grid' | 'table'>('table');

    const [remove, { loading }] = useFileDeletion({
        refetchQueries,
    });

    if (view == 'table')
        return (
            <React.Fragment>
                {loading && <LinearProgress />}
                <Box>
                    {files.map((file, index) => (
                        <FilePreview
                            deleteLoading={false}
                            handleDelete={() => {
                                remove({
                                    variables: {
                                        folder: prefix,
                                        category: storage_category,
                                        name: file.name,
                                    },
                                });
                            }}
                            file={file}
                            key={'filePreview_' + index}
                        />
                    ))}
                </Box>
            </React.Fragment>
        );
    else return <Box></Box>;
};

export default Files;
