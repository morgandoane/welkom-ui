import {
    DocumentNode,
    gql,
    useApolloClient,
    useMutation,
    useQuery,
} from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import {
    ButtonBase,
    Button,
    SxProps,
    Theme,
    useTheme,
    Box,
    Dialog,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { MdAdd, MdDelete } from 'react-icons/md';
import { UploadEnabled } from '../../../graphql/schema/UploadEnabled/UploadEnabled';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useDeletion } from '../../display/Files/components/FileRender';
import {
    SignedUrlArgs,
    SignedUrlQuery,
    SignedUrlRes,
    StorageBucket,
} from '../Attachments/components/FileUpload';
import CarefulButton from '../CarefulButton';

export const RemovePhoto = gql`
    mutation RemovePhoto($folder: String!) {
        removePhoto(folder: $folder)
    }
`;

export interface RemovePhotoArgs {
    folder: string;
}

export interface RemovePhotoRes {
    removePhoto: boolean;
}

export interface ProfilePhotoProps<T extends UploadEnabled> {
    children: T;
    sx?: SxProps<Theme>;
    refetchQueries?: DocumentNode[];
}

const ProfilePhoto = <T extends UploadEnabled>(
    props: ProfilePhotoProps<T>
): ReactElement => {
    const { children, sx = {}, refetchQueries } = props;

    const { palette, shape } = useTheme();

    const [focus, setFocus] = React.useState<string | null>(null);

    const [file, setFile] = React.useState<File | null>(null);

    const client = useApolloClient();

    const onComplete = async () => {
        setFocus(null);
        if (refetchQueries)
            await client.refetchQueries({
                include: refetchQueries,
            });
    };

    const [remove, { loading: removeLoading }] = useMutation<
        RemovePhotoRes,
        RemovePhotoArgs
    >(RemovePhoto, {
        variables: {
            folder: children._id,
        },
        onCompleted: () => onComplete(),
    });

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
            if (file) {
                upload(file, signedUrl.url, new Date(signedUrl.timestamp));
            }
        },
        variables: file
            ? {
                  bucket: StorageBucket.ldbbakery_profiles,
                  identifier: children._id,
                  filename: file.name,
              }
            : undefined,
        skip: !file,
        fetchPolicy: 'network-only',
    });

    const loading = urlLoading || uploadLoading;

    const onDrop = React.useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            if (acceptedFiles.length == 1) {
                setFile(acceptedFiles[0]);
            }
        },
        []
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: [
            '.tif',
            '.tiff',
            '.bitmap',
            '.jpeg',
            '.gif',
            '.png',
            '.eps',
            '.jpg',
        ],
    });

    return (
        <React.Fragment>
            {!children.photo ? (
                <Box {...getRootProps()}>
                    <input {...getInputProps()} />
                    <label htmlFor="raised-button-file">
                        <LoadingButton
                            loadingPosition="start"
                            loading={loading}
                            variant={isDragActive ? 'outlined' : 'text'}
                            component="span"
                            startIcon={<MdAdd />}
                        >
                            Photo
                        </LoadingButton>
                    </label>
                </Box>
            ) : (
                <ButtonBase
                    onClick={() => setFocus(children.photo)}
                    sx={{ ...shape }}
                >
                    <img style={{ height: 300 }} src={children.photo} />
                </ButtonBase>
            )}
            {children.photo && (
                <Dialog
                    fullWidth
                    maxWidth="lg"
                    open={Boolean(focus)}
                    onClose={() => setFocus(null)}
                    PaperProps={{
                        sx: {
                            display: 'flex',
                            flexFlow: 'column',
                            background: palette.background.default,
                        },
                    }}
                >
                    <img src={children.photo} />
                    <Box
                        sx={{
                            padding: 2,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2,
                        }}
                    >
                        <CarefulButton
                            loading={removeLoading}
                            startIcon={<MdDelete />}
                            onClick={() => {
                                remove();
                            }}
                        >
                            Delete photo
                        </CarefulButton>

                        <Box {...getRootProps()}>
                            <input {...getInputProps()} />
                            <label htmlFor="raised-button-file">
                                <LoadingButton
                                    loadingPosition="start"
                                    loading={loading}
                                    variant={
                                        isDragActive ? 'outlined' : 'contained'
                                    }
                                    component="span"
                                >
                                    Change photo
                                </LoadingButton>
                            </label>
                        </Box>
                    </Box>
                </Dialog>
            )}
        </React.Fragment>
    );
};

export default ProfilePhoto;
