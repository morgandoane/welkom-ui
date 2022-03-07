import { Dialog, Box, useTheme, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { useAppFileUrn } from '../../../graphql/schema/AppFile/useAppFileUrn';
import { StorageBucket } from '../../Inputs/Attachments/components/FileUpload';
import { ForgeViewer } from '@contecht/react-adsk-forge-viewer';
import { Animation } from '../../../media/Animation';
import Message from '../../feedback/Message';

export interface ModelViewProps {
    data: null | {
        bucket: StorageBucket;
        identifier: string;
        filename: string;
    };
    onClose: () => void;
}

const ModelView = (props: ModelViewProps): ReactElement => {
    const { data, onClose } = props;

    const { palette } = useTheme();

    const [closing, setClosing] = React.useState(false);

    React.useEffect(() => {
        if (closing) {
            const timeout = setTimeout(() => {
                onClose();
                setClosing(false);
            }, 250);

            return () => clearTimeout(timeout);
        }
    }, [closing, onClose]);

    const {
        data: urnData,
        error,
        loading,
    } = useAppFileUrn({
        variables: !data
            ? undefined
            : {
                  ...data,
              },
        skip: !data,
    });

    return (
        <Dialog
            open={Boolean(data && !closing)}
            maxWidth="xl"
            fullWidth
            onClose={() => setClosing(true)}
            PaperProps={{
                sx: {
                    height: '90vh',
                    background: palette.background.paper,
                },
            }}
        >
            {loading ? (
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexFlow: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box p={2} />
                    <Animation type="gear" style={{ height: 100 }} loop />
                    <Typography>Preparing your model</Typography>
                    <Typography variant="body2" color="textSecondary">
                        This may take a moment the first time
                    </Typography>
                </Box>
            ) : error || !urnData ? (
                <Message
                    type="Error"
                    message={
                        error ? error.message : 'Something unexpected occured'
                    }
                />
            ) : (
                <ForgeViewer {...urnData.file.viewer_urn} />
            )}
        </Dialog>
    );
};

export default ModelView;
