import {
    Box,
    Button,
    Collapse,
    Dialog,
    IconButton,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { HiOutlineClipboard, HiOutlineClipboardCopy } from 'react-icons/hi';
import { MdEmail, MdExpandMore } from 'react-icons/md';
import Anima from '../../../../../../../../components/Anima';
import { OrderDraft } from '../../../../../../../../hooks/useOrderDrafting';

export interface DraftProps {
    draft: OrderDraft;
}

const Draft = (props: DraftProps): ReactElement => {
    const { draft } = props;

    const { palette } = useTheme();

    const [copy, setCopy] = React.useState<null | string>(null);
    const [copied, setCopied] = React.useState(false);

    const [expanded, setExpanded] = React.useState(false);

    const onClick = () => {
        if (!draft.holdup) window.open(draft.link, '_blank');
    };

    React.useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => {
                setCopied(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [copied]);

    return (
        <Box
            sx={{
                borderBottom: `1px solid ${palette.divider}`,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <Typography>{draft.company.name}</Typography>
                <Box sx={{ flex: 1 }} />
                <Box>
                    <Anima type="rotate" in={expanded}>
                        <IconButton onClick={() => setExpanded(!expanded)}>
                            <MdExpandMore />
                        </IconButton>
                    </Anima>
                </Box>
                <Tooltip arrow title={draft.holdup || ''}>
                    <Box>
                        <IconButton
                            disabled={Boolean(draft.holdup)}
                            onClick={onClick}
                        >
                            <MdEmail />
                        </IconButton>
                    </Box>
                </Tooltip>
                <Tooltip arrow title={draft.holdup || 'Copy text'}>
                    <Box>
                        <IconButton
                            disabled={Boolean(draft.holdup)}
                            onClick={() => setCopy(draft.body)}
                        >
                            <HiOutlineClipboardCopy />
                        </IconButton>
                    </Box>
                </Tooltip>
            </Box>
            <Collapse in={expanded}>
                <Box sx={{ paddingLeft: 6, paddingBottom: 2 }}>
                    {draft.items.map((item, index) => (
                        <Box key={'item_' + index} sx={{ p: 1 }}>
                            <Typography variant="body2">
                                {item.content.order_code || 'Needs a PO'}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Collapse>
            <Dialog
                onClose={() => setCopy(null)}
                open={copy !== null}
                fullWidth
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        height: '80vh',
                        display: 'flex',
                        flexFlow: 'column',
                    },
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        borderBottom: `1px solid ${palette.divider}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Email draft</Typography>
                    <Tooltip arrow open={copied} title="Copied!">
                        <Button
                            disabled={!copy}
                            endIcon={<HiOutlineClipboardCopy />}
                            onClick={() => {
                                navigator.clipboard.writeText(copy || '');
                                setCopied(true);
                            }}
                        >
                            Copy text
                        </Button>
                    </Tooltip>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        p: 2,
                        background: palette.background.default,
                    }}
                >
                    <TextField
                        fullWidth
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        value={copy || ''}
                        multiline
                        onChange={(e) => setCopy(e.target.value || '')}
                    />
                </Box>
            </Dialog>
        </Box>
    );
};

export default Draft;
