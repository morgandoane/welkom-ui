import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';
import Message from '../Message';

export interface SideDrawerProps {
    open: boolean;
    onClose: () => void;
    loading?: boolean;
    error?: Error;
    resetError?: ReactElement;
    success?: string;
    onSuccess?: () => void;
    children?: ReactElement | ReactElement[] | ReactNode | ReactNode[];
    wide?: boolean;
    disable_padding?: boolean;
}

const duration = 250;

const SideDrawer = (props: SideDrawerProps): ReactElement => {
    const {
        open,
        children,
        onClose,
        loading = false,
        error,
        success,
        resetError,
        onSuccess,
        wide = false,
        disable_padding = false,
    } = props;
    const [close, setClose] = React.useState<true | null>(null);
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('sm'));

    React.useEffect(() => {
        if (close) {
            const timeout = setTimeout(() => {
                setClose(null);
                if (success && onSuccess) onSuccess();
                else onClose();
            }, duration + 50);

            return () => clearTimeout(timeout);
        }
    }, [onClose, close, onSuccess, success]);

    return (
        <Drawer
            transitionDuration={duration}
            anchor="right"
            open={open && !close}
            onClose={() => setClose(true)}
            PaperProps={{
                sx: {
                    transition: theme.transitions.create('width', {
                        duration: 500,
                    }),
                    width: small ? '80%' : wide ? 600 : 400,
                    padding: disable_padding ? 0 : 4,
                },
            }}
        >
            {error ? (
                <Message
                    type="Warning"
                    message={error.message}
                    action={resetError}
                />
            ) : loading ? (
                <Message type="Loading" />
            ) : success ? (
                <Message
                    type="Success"
                    message={success}
                    onComplete={() => setClose(true)}
                />
            ) : (
                children
            )}
        </Drawer>
    );
};

export default SideDrawer;
