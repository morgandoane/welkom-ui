import { Box, useTheme } from "@mui/material";
import React, { ReactElement } from "react";

type BaseProps = {
  in: boolean;
  type: AnimaType;
  children: ReactElement;
  duration?: number;
};

export type AnimaProps<T extends AnimaType> = T extends "rotate"
  ? {
      degrees?: 180;
    }
  : never;

type AnimaType = "rotate";

const Anima = <T extends AnimaType>(
  props: AnimaProps<T> & BaseProps
): ReactElement => {
  const theme = useTheme();
  const { in: moveIn, children, type } = props;

  switch (type) {
    case "rotate": {
      return (
        <Box
          sx={{
            display: "flex",
            position: "relative",
          }}
        >
          <Box
            sx={{
              transformOrigin: "center",
              transform: moveIn
                ? `rotate(-${props.degrees ? props.degrees + "" : "180"}deg)`
                : "rotate(0deg)",
              transition: theme.transitions.create("transform", {
                duration: props.duration || 250,
              }),
            }}
          >
            {children}
          </Box>
        </Box>
      );
    }
  }
};

export default Anima;
