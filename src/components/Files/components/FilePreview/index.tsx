import {
    Box,
    ButtonBase,
    Dialog,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdDelete } from 'react-icons/md';
import { AppFile } from '../../../../graphql/schema/AppFile/AppFile';
import { truncate } from '../../../../utils/truncate';
import { getFileTypeCategory, iconMap } from '../../../FileUpload';
import { Document, Page } from 'react-pdf';

export interface FilePreviewProps {
    file: AppFile;
    deleteLoading: boolean;
    handleDelete: (id: string) => void;
}

const FilePreview = (props: FilePreviewProps): ReactElement => {
    const { file, deleteLoading, handleDelete } = props;
    const theme = useTheme();

    const [preview, setPreview] = React.useState('');

    const url = file.url.url;

    const onClick = () => {
        window.open(url, '_blank');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <ButtonBase
                onClick={onClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',

                    width: '100%',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                }}
            >
                <Box sx={{ display: 'flex', fontSize: '2rem', padding: 2 }}>
                    {iconMap[getFileTypeCategory(file ? file.name : '')]}
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography>{file ? file.name : ''}</Typography>
                </Box>
            </ButtonBase>
            <Box>
                <IconButton
                    disabled={deleteLoading}
                    onClick={(e) => {
                        handleDelete(file.name);
                    }}
                >
                    <MdDelete />
                </IconButton>
            </Box>
            <Dialog open={Boolean(preview)} onClose={() => setPreview('')}>
                <Document file={preview}>
                    <Page pageNumber={0} />
                </Document>
            </Dialog>
        </Box>
    );
};

export default FilePreview;
