import { Dialog, DialogProps, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactElement } from "react";
import Message from "../Message";
import SideDrawer, { SideDrawerProps } from "../SideDrawer";

export type ResponsiveDialogProps = SideDrawerProps & {
  maxWidth?: DialogProps["maxWidth"];
};

const duration = 250;

const ResponsiveDialog = (props: ResponsiveDialogProps): ReactElement => {
  const {
    open,
    children,
    onClose,
    loading = false,
    error,
    success,
    onSuccess,
    resetError,
    maxWidth = "xs",
  } = props;
  const [close, setClose] = React.useState<true | null>(null);
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    if (close) {
      const timeout = setTimeout(() => {
        setClose(null);
        if (success && onSuccess) onSuccess();
        else onClose();
      }, duration + 50);

      return () => clearTimeout(timeout);
    }
  }, [onClose, close, onSuccess, success]);

  if (small) return <SideDrawer {...props} />;
  else
    return (
      <Dialog
        fullWidth
        maxWidth={maxWidth}
        transitionDuration={duration}
        open={open && !close}
        onClose={() => setClose(true)}
        PaperProps={{ sx: { padding: 3 } }}
      >
        {error ? (
          <Message type="Warning" message={error.message} action={resetError} />
        ) : loading ? (
          <Message type="Loading" />
        ) : success ? (
          <Message
            type="Success"
            message={success}
            onComplete={() => setClose(true)}
          />
        ) : (
          children
        )}
      </Dialog>
    );
};

export default ResponsiveDialog;
