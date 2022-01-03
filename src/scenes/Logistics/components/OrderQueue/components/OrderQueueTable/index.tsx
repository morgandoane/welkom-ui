import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import React, { ReactElement } from "react";
import {
  OrderQueueContentInput,
  OrderQueueContentInputState,
} from "../../../../../../graphql/schema/OrderQueue/OrderQueueInput";
import QueueLine from "./components/QueueLine";

import {
  Announcements,
  closestCenter,
  CollisionDetection,
  DragOverlay,
  DndContext,
  DropAnimation,
  defaultDropAnimation,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import { relocate } from "../../../../../../utils/relocate";

export interface OrderQueueTableProps {
  contents: OrderQueueContentInputState[];
  setContents: (contents: OrderQueueContentInputState[]) => void;
  disabled?: boolean;
}

const OrderQueueTable = (props: OrderQueueTableProps): ReactElement => {
  const { contents, setContents, disabled = false } = props;
  const { palette } = useTheme();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over) {
      const { id: activeId } = active;
      const { id: overId } = over;

      const oldIndex = contents.map((c) => c.id).indexOf(activeId);
      const newIndex = contents.map((c) => c.id).indexOf(overId);

      const newContents = relocate([...contents], oldIndex, newIndex);
      setContents(newContents);
    }
  };

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell sx={{ background: palette.background.paper }}></TableCell>
          <TableCell sx={{ background: palette.background.paper }}>
            PO
          </TableCell>
          <TableCell sx={{ background: palette.background.paper }}>
            Item
          </TableCell>
          <TableCell sx={{ background: palette.background.paper }}>
            Quantity
          </TableCell>
          <TableCell sx={{ background: palette.background.paper }}>
            Unit
          </TableCell>
          <TableCell sx={{ background: palette.background.paper }}>
            Location
          </TableCell>
          <TableCell sx={{ background: palette.background.paper }}>
            Date
          </TableCell>
          <TableCell sx={{ background: palette.background.paper }}></TableCell>
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
            items={contents}
            strategy={verticalListSortingStrategy}
          >
            {contents.map((content, i) => (
              <QueueLine
                disabled={disabled}
                key={"content_" + i}
                content={content}
                drop={() => {
                  const copy = [...contents];
                  copy.splice(i, 1);
                  setContents(copy);
                }}
                setContent={(data) => {
                  const copy = [...contents];
                  copy[i] = data;
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
