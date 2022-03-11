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

export interface QueueTableProps {
    queue: OrderQueueLineInput[];
    setQueue: (queue: OrderQueueLineInput[]) => void;
    touch: () => void;
}

const QueueTable = (props: QueueTableProps): ReactElement => {
    const { queue, setQueue, touch } = props;

    const { palette } = useTheme();

    const headerStyle: SxProps<Theme> = {
        background: palette.background.paper,
    };

    const bodyStyle: SxProps<Theme> = {
        background: palette.tonal,
    };

    return (
        <Box
            sx={{ height: '100%', display: 'flex', flexFlow: 'column' }}
            onClick={() => touch()}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{ width: 80, ...headerStyle }}
                        ></TableCell>
                        <TableCell sx={{ ...headerStyle }}>Item</TableCell>
                        <TableCell sx={{ ...headerStyle, width: 80 }}>
                            Quantity
                        </TableCell>
                        <TableCell sx={{ ...headerStyle }}>Unit</TableCell>
                        <TableCell
                            sx={{
                                ...headerStyle,
                                background: palette.tonal,
                                paddingLeft: '32px',
                            }}
                        >
                            PO
                        </TableCell>
                        <TableCell
                            sx={{ ...headerStyle, background: palette.tonal }}
                        >
                            Vendor
                        </TableCell>
                        <TableCell
                            sx={{ ...headerStyle, background: palette.tonal }}
                        >
                            Destination
                        </TableCell>
                        <TableCell
                            sx={{ ...headerStyle, background: palette.tonal }}
                        >
                            Deliver by
                        </TableCell>
                        <TableCell
                            sx={{ ...headerStyle, background: palette.tonal }}
                        >
                            Time
                        </TableCell>
                        <TableCell
                            sx={{ ...headerStyle, background: palette.tonal }}
                        />
                    </TableRow>
                </TableHead>
                <DragDropContext
                    onDragEnd={(event) => {
                        const { source, destination } = event;
                        if (destination) {
                            const from = source.index;
                            const to = destination.index;
                            const copy = cloneDeep(queue);
                            copy.splice(to, 0, copy.splice(from, 1)[0]);
                            setQueue(copy);
                        }
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
                                        touch={touch}
                                        index={index}
                                        key={'line_' + index}
                                        line={line}
                                        setLine={(l) => {
                                            const copy = cloneDeep(queue);
                                            if (l) {
                                                copy[index] = l;
                                                setQueue(copy);
                                            } else {
                                                copy.splice(index, 1);
                                                setQueue(copy);
                                            }
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
