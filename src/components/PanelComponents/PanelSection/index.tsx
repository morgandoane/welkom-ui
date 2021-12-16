import { Box, Divider, Typography } from "@mui/material";
import React, { ReactElement } from "react";

export interface PanelSectionProps {
  label?: string;
  children?: ReactElement | ReactElement[];
}

const PanelSection = (props: PanelSectionProps): ReactElement => {
  const { label, children } = props;

  return (
    <Box>
      {label && (
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
      )}
      <Divider />
      <Box p={1} />
      {children}
    </Box>
  );
};

export default PanelSection;
