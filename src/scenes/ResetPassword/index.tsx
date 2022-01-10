import { gql } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import { getQueryHook } from '../../graphql/types';
import { useIndexRoute } from '../../routing/router';

export interface ResetPasswordProps {
    success?: boolean;
}

const PasswordTicket = gql`
    query PasswordTicket {
        passwordChangeTicket
    }
`;

export interface PasswordTicketRes {
    passwordChangeTicket: string;
}

const usePasswordTicket = getQueryHook<PasswordTicketRes>(PasswordTicket);

const ResetPassword = (props: ResetPasswordProps): ReactElement => {
    const { success = false } = props;
    const { path } = useIndexRoute();
    const nav = useNavigate();
    const { user } = useAuth0();

    const { palette, shape, shadows } = useTheme();
    const { data, error, loading } = usePasswordTicket();

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: palette.background.default,
                color: palette.text.primary,
            }}
        >
            {success && !loading ? (
                <Message
                    type="Success"
                    message={'Password reset'}
                    // onComplete={() => nav(path)}
                />
            ) : loading ? (
                <Message type="Loading" />
            ) : data ? (
                <Box
                    sx={{
                        ...shape,
                        padding: 6,
                        background: palette.background.paper,
                        display: 'flex',
                        flexFlow: 'column',
                        gap: 4,
                        boxShadow: shadows[6],
                    }}
                >
                    <Typography variant="h4">{`Hey ${
                        user && user.given_name ? user.given_name : 'there'
                    }`}</Typography>
                    <Typography>{"Let's rest your password"}</Typography>
                    <Button
                        onClick={() =>
                            window.location.replace(data.passwordChangeTicket)
                        }
                        size="large"
                        fullWidth
                        endIcon={<MdChevronRight />}
                    >
                        Reset
                    </Button>
                </Box>
            ) : (
                ''
            )}
        </Box>
    );
};

export default ResetPassword;
