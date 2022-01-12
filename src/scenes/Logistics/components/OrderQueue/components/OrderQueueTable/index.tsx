import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { OrderQueueContentInput } from '../../../../../../graphql/schema/OrderQueue/OrderQueueInput';
import QueueLine from './components/QueueLine';

import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    PointerSensor,
} from '@dnd-kit/core';
import {
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable';
import {
    restrictToVerticalAxis,
    restrictToFirstScrollableAncestor,
} from '@dnd-kit/modifiers';
import { relocate } from '../../../../../../utils/relocate';

export interface OrderQueueTableProps {
    contents: OrderQueueContentInput[];
    setContents: (contents: OrderQueueContentInput[]) => void;
    setLocation: (location: string) => void;
    disabled?: boolean;
}

const OrderQueueTable = (props: OrderQueueTableProps): ReactElement => {
    const { contents, setContents, setLocation, disabled = false } = props;
    const { palette } = useTheme();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (over) {
            const { id: activeId } = active;
            const { id: overId } = over;

            const oldIndex = parseInt(activeId.split('_')[1]);
            const newIndex = parseInt(overId.split('_')[1]);

            const newContents = relocate([...contents], oldIndex, newIndex);
            setContents(newContents);
        }
    };

    return (
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell
                        sx={{ background: palette.background.paper }}
                    ></TableCell>
                    <TableCell sx={{ background: palette.background.paper }}>
                        PO
                    </TableCell>
                    <TableCell sx={{ background: palette.background.paper }}>
                        Vendor
                    </TableCell>
                    <TableCell sx={{ background: palette.background.paper }}>
                        Contents
                    </TableCell>
                    <TableCell sx={{ background: palette.background.paper }}>
                        Destination
                    </TableCell>
                    <TableCell sx={{ background: palette.background.paper }}>
                        Date
                    </TableCell>
                    <TableCell sx={{ background: palette.background.paper }}>
                        Time
                    </TableCell>
                    <TableCell
                        sx={{ background: palette.background.paper }}
                    ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <DndContext
                    sensors={sensors}
                    onDragEnd={onDragEnd}
                    collisionDetection={closestCenter}
                    modifiers={[
                        restrictToVerticalAxis,
                        restrictToFirstScrollableAncestor,
                    ]}
                >
                    <SortableContext
                        items={contents.map((c, i) => ({
                            ...c,
                            id: 'content_' + i,
                        }))}
                        strategy={verticalListSortingStrategy}
                    >
                        {contents.map((content, i) => (
                            <QueueLine
                                index={i}
                                disabled={disabled}
                                key={'content_' + i}
                                content={content}
                                drop={() => {
                                    const copy = [...contents];
                                    copy.splice(i, 1);
                                    setContents(copy);
                                }}
                                setContent={(data) => {
                                    const copy = [...contents];
                                    copy[i] = data;
                                    if (data.location) {
                                        setLocation(data.location);
                                    }
                                    setContents(copy);
                                }}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </TableBody>
        </Table>
    );
};

export default OrderQueueTable;
