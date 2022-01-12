import { LoadingButton } from '@mui/lab';
import { Box, Popover, Tooltip, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdEmail } from 'react-icons/md';
import { OrderQueueContentInput } from '../../../../../../graphql/schema/OrderQueue/OrderQueueInput';
import { useClickState } from '../../../../../../hooks/useClickState';
import { useOrderDrafting } from '../../../../../../hooks/useOrderDrafting';
import Draft from './components/Draft';

export interface OrderQueueEmailsProps {
    contents: OrderQueueContentInput[];
}

const OrderQueueEmails = (props: OrderQueueEmailsProps): ReactElement => {
    const { contents } = props;

    const { palette } = useTheme();

    const { data: drafts, error, loading } = useOrderDrafting(contents);

    const [clickState, setClickState] = useClickState();

    return (
        <React.Fragment>
            <Tooltip arrow title={error ? error.message : ''}>
                <Box>
                    <LoadingButton
                        onClick={(e) =>
                            setClickState({ target: e.currentTarget })
                        }
                        color="inherit"
                        disabled={Boolean(error)}
                        variant="contained"
                        endIcon={<MdEmail />}
                        loading={loading}
                        sx={{
                            paddingLeft: 3,
                            paddingRight: 3,
                            color: palette.getContrastText(
                                palette.text.primary
                            ),
                        }}
                    >
                        Emails
                    </LoadingButton>
                </Box>
            </Tooltip>
            <Popover
                open={Boolean(clickState)}
                anchorEl={clickState ? clickState.target : null}
                onClose={() => setClickState(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ width: 300 }}>
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: `1px solid ${palette.divider}`,
                        }}
                    >
                        <Typography variant="h6">Email drafts</Typography>
                    </Box>
                    <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                        {drafts.map((d, i) => (
                            <Draft key={'draft_' + i} draft={d} />
                        ))}
                    </Box>
                </Box>
            </Popover>
        </React.Fragment>
    );
};

export default OrderQueueEmails;
