import { cloneDeep } from '@apollo/client/utilities';
import {
    SxProps,
    useTheme,
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Theme,
    TableBody,
    Typography,
} from '@mui/material/';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import React, { ReactElement } from 'react';
import { OrderQueueLineInput } from '../../../../../../graphql/schema/OrderQueueLine/OrderQueueLineInput';
import QueueLine from './components/QueueLine';

const threshold = 3000;

export interface QueueTableProps {
    queue: OrderQueueLineInput[];
    setQueue: (queue: OrderQueueLineInput[]) => void;
}

const QueueTable = (props: QueueTableProps): ReactElement => {
    const { queue, setQueue } = props;

    const { palette } = useTheme();

    const headerStyle: SxProps<Theme> = {
        background: palette.background.paper,
    };

    const bodyStyle: SxProps<Theme> = {
        background: palette.tonal,
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexFlow: 'column' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{ width: 80, ...headerStyle }}
                        ></TableCell>
                        <TableCell sx={{ ...headerStyle }}>PO</TableCell>
                        <TableCell sx={{ ...headerStyle }}>Vendor</TableCell>
                        <TableCell sx={{ ...headerStyle }}>Item</TableCell>
                        <TableCell sx={{ ...headerStyle }}>Quantity</TableCell>
                        <TableCell sx={{ ...headerStyle }}>Unit</TableCell>
                        <TableCell sx={{ ...headerStyle }}>
                            Destination
                        </TableCell>
                        <TableCell sx={{ ...headerStyle }}>Date</TableCell>
                    </TableRow>
                </TableHead>
                <DragDropContext
                    onDragEnd={(event) => {
                        //
                    }}
                >
                    <Droppable droppableId="queue">
                        {(provided, snapshot) => (
                            <TableBody
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {queue.map((line, index) => (
                                    <QueueLine
                                        key={'line_' + index}
                                        line={line}
                                        setLine={(l) => {
                                            const copy = cloneDeep(queue);
                                            copy[index] = l;
                                            setQueue(copy);
                                        }}
                                    />
                                ))}
                                {provided.placeholder}
                            </TableBody>
                        )}
                    </Droppable>
                </DragDropContext>
            </Table>
        </Box>
    );
};

export default QueueTable;
