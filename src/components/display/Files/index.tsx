import { DocumentNode } from '@apollo/client';
import { Box, Table, TableBody } from '@mui/material';
import React, { ReactElement } from 'react';
import { AppFile } from '../../../graphql/schema/AppFile/AppFile';
import { StorageBucket } from '../../Inputs/Attachments/components/FileUpload';
import ModelView, { ModelViewProps } from '../ModelView/ModelView';
import FileRender from './components/FileRender';

export interface FilesProps {
    children: AppFile[];
    folder: string;
    refetchQueries: DocumentNode[];
    bucket: StorageBucket;
}

const Files = (props: FilesProps): ReactElement => {
    const { children: files, folder, refetchQueries } = props;

    const [model, setModel] = React.useState<ModelViewProps['data']>(null);

    return (
        <React.Fragment>
            <Table>
                <TableBody>
                    {files.map((file, index) => (
                        <FileRender
                            refetchQueries={refetchQueries}
                            folder={folder}
                            key={'file_' + file.name + '_' + index}
                            setModel={(file) =>
                                setModel({
                                    bucket: props.bucket,
                                    identifier: props.folder,
                                    filename: file.name,
                                })
                            }
                        >
                            {file}
                        </FileRender>
                    ))}
                </TableBody>
            </Table>
            <ModelView data={model} onClose={() => setModel(null)} />
        </React.Fragment>
    );
};

export default Files;
