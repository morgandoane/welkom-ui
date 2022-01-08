import {
  Fade,
  IconButton,
  LinearProgress,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  addDays,
  addMonths,
  addWeeks,
  differenceInDays,
  format,
  getDate,
  isSameDay,
} from "date-fns";
import React, { ReactElement } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { DateRangeInput } from "../../graphql/schema/DateRange/DateRange";
import {
  getCalendarRange,
  useCalendarRange,
} from "../../hooks/useCalendarRange";
import { dateFormats } from "../../utils/dateFormats";
import ColumnBox from "../Layout/ColumnBox";
import Message from "../Message";
import CalendarEventGroup from "./components/CalendarEventGroup";

export interface EventProps<T> {
  id: string;
  icon: ReactElement;
  primary: string;
  secondary?: string;
  event: T;
  onClick?: (d: T, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface EventGroupProps<T> {
  events: T[];
  date: Date;
  label?: {
    icon?: ReactElement;
    primary: string;
    secondary?: string;
  };
}

export interface CalendarProps<T> {
  index: number;
  onIndex: (index: number, range: DateRangeInput) => void;
  eventGroups: EventGroupProps<T>[];
  getEventProps: (d: T, index: number) => EventProps<T>;
  actions?: ReactElement;
  loading?: boolean;
  error?: Error;
}

const Calendar = <T,>(props: CalendarProps<T>): ReactElement => {
  const {
    index,
    eventGroups,
    actions,
    loading,
    error,
    onIndex,
    getEventProps,
  } = props;
  const { palette, shape } = useTheme();

  const [calIndex, setCalIndex, { start, end }, now] = useCalendarRange(index);

  const weekTotal = differenceInDays(end, start) / 7;

  const [fade, setFade] = React.useState(false);
  const [direction, setDirection] = React.useState<"left" | "right">("left");

  React.useEffect(() => {
    if (index !== calIndex) {
      setCalIndex(index);
      setFade(false);
      setDirection(index > calIndex ? "left" : "right");
    }
  }, [index, calIndex, setCalIndex]);

  React.useEffect(() => {
    if (!fade) {
      const timeout = setTimeout(() => {
        setFade(true);
      }, 5);

      return () => clearTimeout(timeout);
    }
  }, [fade]);

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "hidden",
        ...shape,
        border: `1px solid ${palette.divider}`,
        display: "flex",
        flexFlow: "column",
      }}
    >
      {loading && (
        <Box
          sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 8 }}
        >
          <LinearProgress />
        </Box>
      )}
      <Box
        sx={{
          padding: 2,
          borderBottom: `1px solid ${palette.divider}`,
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: 160 }} variant="h6">
            {format(
              addMonths(new Date(), calIndex),
              dateFormats.month + " " + dateFormats.year
            )}
          </Typography>
          <Box />
          <IconButton
            onClick={() =>
              onIndex(calIndex - 1, getCalendarRange(now, calIndex - 1))
            }
            sx={{ height: 32, width: 32, fontSize: "2rem" }}
          >
            <Box sx={{ display: "flex" }}>
              <MdChevronLeft />
            </Box>
          </IconButton>
          <IconButton
            onClick={() =>
              onIndex(calIndex + 1, getCalendarRange(now, calIndex + 1))
            }
            sx={{ height: 32, width: 32, fontSize: "2rem" }}
          >
            <Box sx={{ display: "flex" }}>
              <MdChevronRight />
            </Box>
          </IconButton>
        </Box>
        <Box sx={{ flex: 1 }} />
        <Box>{actions}</Box>
      </Box>
      {error ? (
        <Message type="Warning" message={error.message} />
      ) : (
        <Fade in={fade}>
          <Slide
            in={fade}
            style={{ transitionDelay: fade ? "100ms" : "0ms" }}
            direction={direction}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexFlow: "column",
                overflow: "hidden",
              }}
            >
              {[...Array(weekTotal).keys()].map((weekIndex) => (
                <Box
                  key={"week_" + weekIndex}
                  sx={{
                    display: "flex",
                    flexFlow: "row",
                    maxHeight: `calc(100% / ${weekTotal})`,
                    flex: 1,
                    borderBottom:
                      weekIndex !== weekTotal - 1
                        ? `1px solid ${palette.divider}`
                        : undefined,
                  }}
                >
                  {[...Array(7).keys()].map((dayIndex) => {
                    const thisDate = addWeeks(
                      addDays(start, dayIndex),
                      weekIndex
                    );
                    const isToday = isSameDay(now, thisDate);
                    const groups = eventGroups.filter((group) =>
                      isSameDay(group.date, thisDate)
                    );
                    return (
                      <Box
                        key={"week_" + weekIndex + "_" + dayIndex}
                        sx={{
                          width: "calc(100% / 7)",
                          borderRight:
                            dayIndex !== 6
                              ? `1px solid ${palette.divider}`
                              : undefined,
                        }}
                      >
                        <ColumnBox>
                          {{
                            header: (
                              <Box sx={{ padding: 0.5 }}>
                                <Box
                                  sx={{
                                    background: isToday
                                      ? palette.primary.main
                                      : undefined,
                                    width: 24,
                                    height: 24,
                                    borderRadius: 12,
                                    borderTopLeftRadius: 4,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      marginTop: 0.25,
                                      color: isToday
                                        ? palette.primary.contrastText
                                        : undefined,
                                    }}
                                    variant="body2"
                                  >
                                    {getDate(thisDate)}
                                  </Typography>
                                </Box>
                              </Box>
                            ),
                            content: (
                              <Box
                                sx={{
                                  overflow: "auto",
                                  display: "flex",
                                  flexFlow: "column",
                                  gap: 1,
                                  padding: 1,
                                }}
                              >
                                {groups.map((group, i) => (
                                  <CalendarEventGroup
                                    getEventProps={getEventProps}
                                    key={
                                      "week_" +
                                      weekIndex +
                                      "_day_" +
                                      dayIndex +
                                      "_event_" +
                                      i
                                    }
                                  >
                                    {group}
                                  </CalendarEventGroup>
                                ))}
                              </Box>
                            ),
                          }}
                        </ColumnBox>
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Box>
          </Slide>
        </Fade>
      )}
    </Box>
  );
};

export default Calendar;
