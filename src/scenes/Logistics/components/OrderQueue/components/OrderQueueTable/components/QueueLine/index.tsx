import { IconButton, TableCell, TableRow } from "@mui/material";
import React, { ReactElement } from "react";
import { OrderQueueContentInputState } from "../../../../../../../../graphql/schema/OrderQueue/OrderQueueInput";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/system";
import { MdDelete, MdDragHandle } from "react-icons/md";
import ItemField from "../../../../../../../../components/Forms/components/ItemField";
import CodeField from "../../../../../../../../components/Forms/components/CodeField";
import { CodeType } from "../../../../../../../../graphql/schema/Code/Code";
import UnitField from "../../../../../../../../components/Forms/components/UnitField";
import NumberField from "../../../../../../../../components/Forms/components/NumberField";
import LocationField from "../../../../../../../../components/Forms/components/LocationField";
import DateField from "../../../../../../../../components/Forms/components/DateField";

export interface QueueLineProps {
  content: OrderQueueContentInputState;
  setContent: (contents: OrderQueueContentInputState) => void;
  disabled?: boolean;
  drop: () => void;
}

const QueueLine = (props: QueueLineProps): ReactElement => {
  const { content, setContent, drop } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: content.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell {...listeners} {...attributes} sx={{ width: 20 }}>
        <Box
          sx={{
            display: "flex",
            fontSize: "2rem",
            cursor: transform ? "grabbing" : "grab",
          }}
        >
          <MdDragHandle />
        </Box>
      </TableCell>
      <TableCell sx={{ width: 140 }}>
        <CodeField
          naked
          type={CodeType.PO}
          value={content.order_code || ""}
          onChange={(val) => {
            setContent({ ...content, order_code: val });
          }}
        />
      </TableCell>
      <TableCell sx={{ width: 200 }}>
        <ItemField
          naked
          value={content.item || ""}
          onChange={(val) => {
            setContent({ ...content, item: val || undefined });
          }}
        />
      </TableCell>
      <TableCell sx={{ width: 80 }}>
        <NumberField
          naked
          value={content.quantity == undefined ? null : content.quantity}
          label="Quantity"
          onChange={(val) => {
            setContent({ ...content, quantity: val || undefined });
          }}
        />
      </TableCell>
      <TableCell>
        <UnitField
          naked
          value={content.unit || ""}
          onChange={(val) => {
            setContent({ ...content, unit: val || undefined });
          }}
        />
      </TableCell>
      <TableCell>
        <LocationField
          naked
          value={content.location || ""}
          onChange={(val) => {
            setContent({ ...content, location: val || undefined });
          }}
        />
      </TableCell>
      <TableCell>
        <DateField
          naked
          value={content.date || null}
          onChange={(val) => {
            setContent({ ...content, date: val || undefined });
          }}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => drop()}>
          <MdDelete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default QueueLine;
