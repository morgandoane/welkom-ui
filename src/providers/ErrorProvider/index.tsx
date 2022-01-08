import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Message from "../../components/Message";

const ErrorFallback = (props: {
  error: Error;
  resetErrorBoundary: () => void;
}): ReactElement => {
  const {
    palette: { text, background },
  } = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        color: text.primary,
        background: background.default,
      }}
    >
      <Message
        type="Warning"
        message={props.error.message || "An error occured"}
        action={<Button onClick={props.resetErrorBoundary}>Reset</Button>}
      />
    </Box>
  );
};

const ErrorProvider = (props: { children: ReactElement }) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    {props.children}
  </ErrorBoundary>
);

export default ErrorProvider;
