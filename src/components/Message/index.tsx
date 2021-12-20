import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Typography,
} from "@mui/material";
import React, { ReactElement } from "react";
import { MdExpandMore } from "react-icons/md";
import ReactJson from "react-json-view";
import { Animation } from "../../media/Animation";
import Anima from "../Anima";

export interface MessageProps {
  type: "Error" | "Warning" | "Success" | "Loading" | "Info";
  message?: string;
  action?: ReactElement;
  onComplete?: () => void;
  error?: Error;
}

const Message = (props: MessageProps): ReactElement => {
  const { type, message, action, error, onComplete } = props;

  const [done, setDone] = React.useState(false);
  const [showDetail, setShowDetail] = React.useState(false);

  React.useEffect(() => {
    if (done && onComplete) {
      const timeout = setTimeout(() => {
        setDone(false);
        onComplete();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [done, onComplete]);

  const iconMap: Record<MessageProps["type"], ReactElement> = {
    Error: (
      <Animation
        style={{ height: 100, width: 100 }}
        loop={false}
        type="warning"
        onComplete={() => setDone(true)}
      />
    ),
    Warning: (
      <Animation
        style={{ height: 100, width: 100 }}
        loop={false}
        type="warning"
        onComplete={() => setDone(true)}
      />
    ),
    Success: (
      <Animation
        style={{ height: 100, width: 100 }}
        loop={false}
        type="success"
        onComplete={() => setDone(true)}
      />
    ),
    Loading: <CircularProgress />,
    Info: (
      <Animation
        onComplete={() => setDone(true)}
        style={{ height: 100, width: 100 }}
        loop={false}
        type="info"
      />
    ),
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
      }}
    >
      <Box sx={{ fontSize: "2.5rem" }}>{iconMap[type]}</Box>
      {message && <Typography>{message}</Typography>}
      {action}
      {(type == "Error" || type == "Warning") && error && (
        <Box>
          <Button
            onClick={() => setShowDetail(!showDetail)}
            endIcon={
              <Anima type="rotate" in={showDetail}>
                <MdExpandMore />
              </Anima>
            }
          >
            Details
          </Button>
          <Collapse in={showDetail}>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "flex-start",
              }}
            >
              <ReactJson
                src={{
                  name: error.name,
                  message: error.message,
                  stack: error.stack,
                }}
              />
            </Box>
          </Collapse>
        </Box>
      )}
    </Box>
  );
};

export default Message;
