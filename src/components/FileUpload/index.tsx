import {
    Button,
    Collapse,
    Fab,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement, ReactNode } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { fileFormats } from './fileFormats';
import {
    HiOutlineDocument,
    HiOutlineVolumeUp,
    HiPhotograph,
    HiOutlineTable,
} from 'react-icons/hi';
import { MdClose, MdUploadFile } from 'react-icons/md';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { IoMdCube } from 'react-icons/io';

export enum FileTypeCategory {
    Audio = 'Audio',
    Document = 'Document',
    Model = 'Model',
    Image = 'Image',
    Other = 'Other',
    PDF = 'PDF',
    Spreadsheet = 'Spreadsheet',
    Video = 'Video',
    Zip = 'Zip',
}

export const getFileTypeCategory = (file: File | string) => {
    const match = Object.keys(FileTypeCategory).find((key) =>
        fileFormats
            .filter((f) => f.Category === (key as FileTypeCategory))
            .map((fileFormat) => fileFormat.Type)
            .flat()
            .join(',')
            .includes(
                file instanceof File ? file.type : '.' + file.split('.')[1]
            )
    );

    if (match) return match as FileTypeCategory;
    else return FileTypeCategory.Document;
};

export const iconMap: Record<FileTypeCategory, ReactNode> = {
    Audio: <HiOutlineVolumeUp />,
    Document: <HiOutlineDocument />,
    Image: <HiPhotograph />,
    Model: <IoMdCube />,
    Other: <HiOutlineDocument />,
    PDF: <AiOutlineFilePdf />,
    Spreadsheet: <HiOutlineTable />,
    Video: <HiOutlineDocument />,
    Zip: <HiOutlineDocument />,
};

const pluralName: Record<FileTypeCategory, string> = {
    Audio: 'audio files',
    Document: 'documents',
    Image: 'images',
    Model: 'models',
    Other: 'files',
    PDF: 'pdfs',
    Spreadsheet: 'spreadsheets',
    Video: 'videos',
    Zip: 'zip files',
};

export interface FileUploadProps {
    onChange: (value: File[]) => void;
    accept?: FileTypeCategory[];
    fab?: boolean;
}

const FileUpload = (props: FileUploadProps): ReactElement => {
    const { shape, palette, spacing } = useTheme();
    const {
        onChange,
        accept = [
            'Audio',
            'Document',
            'Image',
            'Model',
            'Other',
            'PDF',
            'Spreadsheet',
            'Video',
            'Zip',
        ],
        fab = false,
    } = props;

    const [warning, setWarning] = React.useState<string | null>(null);

    const getFileTypes = (): string =>
        fileFormats
            .filter((format) =>
                accept.includes(format.Category as FileTypeCategory)
            )
            .map((row) => row.Type)
            .flat()
            .join(', ');

    const getIcon = () => {
        if (accept.length == 0) return iconMap['Document'];
        if (accept.length > 1) {
            return iconMap['Document'];
        } else return iconMap[accept[0]];
    };

    const onDrop = React.useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            if (fileRejections[0]) {
                setWarning(fileRejections[0].errors[0].message);
                onChange(acceptedFiles);
            } else {
                onChange(acceptedFiles);
            }
        },
        [onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: getFileTypes(),
    });

    if (fab) {
        return (
            <Box
                {...getRootProps()}
                sx={{
                    position: 'absolute',
                    bottom: spacing(6),
                    right: spacing(6),
                }}
            >
                <Fab
                    color={isDragActive ? 'inherit' : 'primary'}
                    variant="extended"
                    component={'label'}
                >
                    <Box
                        sx={{
                            fontSize: '1.5rem',
                            display: 'flex',
                            paddingRight: 1,
                        }}
                    >
                        {<MdUploadFile />}
                    </Box>
                    Upload
                    {/* <input {...getInputProps()} /> */}
                </Fab>
            </Box>
        );
    }

    return (
        <Box
            {...getRootProps()}
            sx={{
                ...shape,
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                padding: 2,
                border: `1px solid ${
                    isDragActive ? palette.primary.main : palette.divider
                }`,
            }}
        >
            <Box sx={{ padding: 1, fontSize: '3rem' }}>{getIcon()}</Box>
            <Typography>{`Drag n' drop ${
                accept.length == 1 ? pluralName[accept[0]] : pluralName['Other']
            } here`}</Typography>
            <input {...getInputProps()} />
            <Collapse in={Boolean(warning)}>
                <Box
                    sx={{
                        ...shape,
                        background: palette.error.main,
                        padding: 2,
                        marginTop: 2,
                        position: 'relative',
                    }}
                >
                    <Typography>{warning}</Typography>
                    <IconButton
                        onClick={() => setWarning(null)}
                        sx={{ position: 'absolute', top: 1, right: 1 }}
                    >
                        <MdClose />
                    </IconButton>
                </Box>
            </Collapse>
        </Box>
    );
};

export default FileUpload;
