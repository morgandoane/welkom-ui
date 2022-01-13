import {
    Box,
    Button,
    Collapse,
    IconButton,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';
import { id } from 'date-fns/locale';
import React, { ReactElement } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { MdCheckCircle, MdExpandMore, MdEdit } from 'react-icons/md';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Anima from '../../../../../../../../components/Anima';
import AppFab from '../../../../../../../../components/AppFab';
import {
    Fulfillment,
    FulfillmentType,
} from '../../../../../../../../graphql/schema/Fulfillment/Fulfillment';
import { useClickState } from '../../../../../../../../hooks/useClickState';
import FulfillmentLine from './components/FulfillmentLine';

export interface FulfillmentContentsProps {
    fulfillment: Fulfillment;
}

const FulfillmentContents = (props: FulfillmentContentsProps): ReactElement => {
    const { fulfillment } = props;

    const nav = useNavigate();

    const { palette } = useTheme();

    return (
        <Box
            sx={{
                paddingTop: 3,
                display: 'flex',
                flexFlow: 'column',
                gap: 2,
                alignItems: 'flex-start',
            }}
        >
            {fulfillment.bol.contents.map((c, i) => (
                <FulfillmentLine
                    key={'fLine_' + i}
                    content={c}
                    fulfillment={fulfillment}
                />
            ))}
            <AppFab
                icon={<MdEdit />}
                onClick={() => nav('edit')}
            >{`Edit ${fulfillment.type}`}</AppFab>
        </Box>
    );
};

export default FulfillmentContents;
