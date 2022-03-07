import React, { ReactElement } from 'react';
import { UploadEnabled } from '../../../graphql/schema/UploadEnabled/UploadEnabled';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Box, Button, List, Slide, Typography, useTheme } from '@mui/material';
import { cloneDeep } from '@apollo/client/utilities';
import { uuid } from 'uuidv4';
import FileUpload, { StorageBucket } from './components/FileUpload';
import Files from '../../display/Files';
import { DocumentNode } from '@apollo/client';

export interface AttachmentsProps<T extends UploadEnabled> {
    refetchQueries: DocumentNode[];
    children: T;
}

const Attachments = <T extends UploadEnabled>(
    props: AttachmentsProps<T>
): ReactElement => {
    const [queue, setQueue] = React.useState<
        Record<string, { file: File; state: 'pending' | 'processed' }>
    >({});

    React.useEffect(() => {
        if (
            Object.values(queue).length > 0 &&
            Object.values(queue).every((v) => v.state == 'processed')
        ) {
            // cleanup
            const timeout = setTimeout(() => {
                setQueue({});
            }, 2500);

            return () => clearTimeout(timeout);
        }
    }, [queue]);

    const { palette, shape, shadows } = useTheme();

    const onDrop = React.useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            const copy = cloneDeep(queue);
            for (const file of acceptedFiles) {
                const id = uuid();
                copy[id] = { file, state: 'pending' };
            }
            setQueue(copy);
        },
        []
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <Box
            sx={{
                height: '100%',
                overflow: 'auto',
                ...(isDragActive ? { background: palette.action.hover } : {}),
            }}
        >
            <Files
                bucket={StorageBucket.ldbbakery_attachments}
                folder={props.children._id}
                refetchQueries={props.refetchQueries}
            >
                {props.children.files}
            </Files>
            <Box {...getRootProps()}>
                <input {...getInputProps()} />
                <Slide in={Object.keys(queue).length > 0} direction="up">
                    <Box
                        sx={{
                            zIndex: 20,
                            position: 'absolute',
                            bottom: '48px',
                            right: '48px',
                            background: palette.background.paper,
                            boxShadow: shadows[6],
                            minWidth: 260,
                            maxWidth: 500,
                            ...shape,
                        }}
                    >
                        <Box
                            sx={{
                                p: 2,
                                borderBottom: `1px solid ${palette.divider}`,
                            }}
                        >
                            <Typography>{`Uploads (${
                                Object.values(queue).filter(
                                    (q) => q.state == 'processed'
                                ).length
                            }/${
                                Object.keys(queue).length
                            } complete)`}</Typography>
                        </Box>
                        <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                            <List>
                                {Object.keys(queue).map((key, index) => (
                                    <FileUpload
                                        refetchQueries={props.refetchQueries}
                                        ready={
                                            Object.keys(queue).filter(
                                                (key) =>
                                                    queue[key].state ==
                                                    'pending'
                                            )[0] == key
                                        }
                                        key={'file_' + key}
                                        folder={props.children._id}
                                        file={queue[key].file}
                                        state={queue[key].state}
                                        uuid={key}
                                        onProcessed={() => {
                                            const copy = cloneDeep({
                                                ...queue,
                                            });
                                            copy[key].state = 'processed';
                                            console.log(copy);
                                            setQueue({ ...copy });
                                        }}
                                    />
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Slide>

                <label htmlFor="raised-button-file">
                    <Button
                        size="large"
                        component="span"
                        sx={{
                            position: 'absolute',
                            bottom: '48px',
                            right: '48px',
                            borderRadius: 24,
                        }}
                    >
                        Upload
                    </Button>
                </label>
            </Box>
        </Box>
    );
};

export default Attachments;
