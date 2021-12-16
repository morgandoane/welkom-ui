import { Box, CircularProgress, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { Animation } from "../../media/Animation";

export interface MessageProps {
  type: "Error" | "Warning" | "Success" | "Loading" | "Info";
  message?: string;
  action?: ReactElement;
  onComplete?: () => void;
}

const Message = (props: MessageProps): ReactElement => {
  const { type, message, action, onComplete } = props;

  const [done, setDone] = React.useState(false);

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
    </Box>
  );
};

export default Message;
