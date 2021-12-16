import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";

export interface PageTitleProps {
  children: string | [string, string];
}

const PageTitle = (props: PageTitleProps): ReactElement => {
  const { children } = props;

  if (children instanceof Array)
    return (
      <Box>
        <Typography variant="h3">{children[0]}</Typography>
        <Typography
          sx={{ paddingBottom: 2 }}
          variant="body1"
          color="textSecondary"
        >
          {children[1]}
        </Typography>
      </Box>
    );
  else
    return (
      <Box>
        <Typography sx={{ paddingBottom: 2 }} variant="h3">
          {children}
        </Typography>
      </Box>
    );
};

export default PageTitle;
