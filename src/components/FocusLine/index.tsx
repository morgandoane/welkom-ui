import { Divider, styled } from "@mui/material";
import React, { ReactElement } from "react";

const Root = styled("div")(({ theme }) => ({
  position: "relative",
}));

const Line = styled("div")(({ theme }) => ({
  position: "absolute",
  margin: "auto",
  background: theme.palette.primary.main,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shortest,
  }),
  marginBottom: "1px",
}));

export interface FocusedLineProps {
  focused: boolean;
}

const FocusedLine = (props: FocusedLineProps): ReactElement => {
  const { focused } = props;
  return (
    <Root>
      <Line
        sx={{
          width: focused ? "100%" : "0%",
          height: focused ? "1.25px" : ".75px",
        }}
      />
      <Divider />
    </Root>
  );
};

export default FocusedLine;
