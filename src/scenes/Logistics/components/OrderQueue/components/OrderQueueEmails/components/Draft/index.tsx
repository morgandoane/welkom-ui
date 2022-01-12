import {
    Box,
    Collapse,
    IconButton,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdEmail, MdExpandMore } from 'react-icons/md';
import Anima from '../../../../../../../../components/Anima';
import { OrderDraft } from '../../../../../../../../hooks/useOrderDrafting';

export interface DraftProps {
    draft: OrderDraft;
}

const Draft = (props: DraftProps): ReactElement => {
    const { draft } = props;

    const { palette } = useTheme();

    const [expanded, setExpanded] = React.useState(false);

    const onClick = () => {
        if (!draft.holdup) window.open(draft.link, '_blank');
    };

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
        </Box>
    );
};

export default Draft;
