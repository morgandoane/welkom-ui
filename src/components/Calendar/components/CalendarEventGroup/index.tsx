import {
  Box,
  ButtonGroup,
  Collapse,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ReactElement } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { EventGroupProps, EventProps } from "../..";
import Anima from "../../../Anima";
import CalendarEvent from "../CalendarEvent";

export interface CalendarEventGroupProps<T> {
  children: EventGroupProps<T>;
  getEventProps: (d: T, index: number) => EventProps<T>;
}

const CalendarEventGroup = <T,>(
  props: CalendarEventGroupProps<T>
): ReactElement => {
  const {
    children: { events, label },
    getEventProps,
  } = props;

  const { palette, shape, transitions } = useTheme();

  const [open, setOpen] = React.useState(true);

  if (label) {
    return (
      <Box sx={{ ...shape, background: palette.background.paper }}>
        <Box
          onClick={() => setOpen(!open)}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: open ? `1px solid ${palette.divider}` : "",
            transition: transitions.create("borderBottom", { duration: 200 }),
          }}
        >
          <Box
            sx={{
              paddingLeft: 1,
              display: "flex",
              flexFlow: "row",
              gap: 1,
              alignItems: "center",
            }}
          >
            {label.icon && (
              <Box sx={{ display: "flex", fontSize: "1.25rem" }}>
                {label.icon}
              </Box>
            )}
            <Box>
              <Typography variant="body2">{label.primary}</Typography>
              <Typography color="textSecondary" variant="caption">
                {label.secondary}
              </Typography>
            </Box>
          </Box>
          <Anima type="rotate" in={open}>
            <IconButton onClick={() => setOpen(!open)} size="small">
              <MdExpandMore />
            </IconButton>
          </Anima>
        </Box>
        <Collapse in={open}>
          <ButtonGroup orientation="vertical" fullWidth>
            {events.map((e, i) => (
              <CalendarEvent key={getEventProps(e, i).id}>
                {getEventProps(e, i)}
              </CalendarEvent>
            ))}
          </ButtonGroup>
        </Collapse>
      </Box>
    );
  } else
    return (
      <ButtonGroup orientation="vertical" fullWidth>
        {events.map((e, i) => (
          <CalendarEvent key={getEventProps(e, i).id}>
            {getEventProps(e, i)}
          </CalendarEvent>
        ))}
      </ButtonGroup>
    );
};

export default CalendarEventGroup;
