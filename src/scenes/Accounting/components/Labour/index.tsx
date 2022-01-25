import { Button, Dialog, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { ReactElement } from 'react';
import AppFab from '../../../../components/AppFab';
import AppNav from '../../../../components/AppNav';
import PageTitle from '../../../../components/PageTitle';
import PanelHeader from '../../../../components/PanelComponents/PanelHeader';
import { useFileUpload } from '../../../../hooks/useFileUpload';
import {
    useLazySignedUrl,
    useSignedUrl,
} from '../../../../graphql/queries/signedUrl/useSignedUrl';
import { useAuth0 } from '@auth0/auth0-react';
import { SignedUrlAction } from '../../../../graphql/queries/signedUrl/useSignedUrls';
import { StorageBucket } from '../../../../graphql/schema/SignedUrl/SignedUrl';

const Labour = (): ReactElement => {
    const { user } = useAuth0();
    const [state, setState] = React.useState<{
        file: File | null;
    } | null>(null);

    const [upload, { progress }] = useFileUpload({
        onComplete: (data) => {
            setState(null);
        },
        onError: (error) => {
            //
        },
    });

    const [getSignedUrl, { loading: signatureLoading }] = useLazySignedUrl({
        variables: {
            config: {
                prefix: 'workbook',
                category: StorageBucket.Workbooks,
                name: state && state.file ? state.file.name : '',
                action: SignedUrlAction.write,
            },
        },
        onCompleted: (data) => {
            if (state && state.file) upload(state.file, data.signedUrl.url);
        },
        onError: (error) => {
            if (state) {
                //
            }
        },
        fetchPolicy: 'network-only',
    });

    return (
        <AppNav>
            <PageTitle>Labour</PageTitle>
            <AppFab onClick={() => setState({ file: null })}>
                Upload Workbook
            </AppFab>
            <Dialog
                PaperProps={{ sx: { p: 3 } }}
                open={Boolean(state)}
                onClose={() => setState(null)}
            >
                <PanelHeader onClose={() => setState(null)}>
                    Upload Workbook
                </PanelHeader>
                <Button variant="contained" color="inherit" component="label">
                    {state && state.file ? state.file.name : 'Upload File'}
                    <input
                        type="file"
                        hidden
                        onChange={(e) =>
                            setState({
                                file: e.target.files ? e.target.files[0] : null,
                            })
                        }
                    />
                </Button>
                <Box sx={{ paddingTop: 2 }}>
                    <LoadingButton
                        loading={signatureLoading}
                        onClick={() => getSignedUrl()}
                        disabled={!state || !state.file}
                        variant="contained"
                        fullWidth
                    >
                        Upload
                    </LoadingButton>
                </Box>
            </Dialog>
        </AppNav>
    );
};

export default Labour;
