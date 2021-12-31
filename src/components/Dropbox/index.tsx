import { Box, Collapse, IconButton, useTheme } from "@mui/material";
import React, { ReactElement } from "react";
import { MdExpandMore } from "react-icons/md";
import Anima from "../Anima";

export interface DropboxProps {
  children: [ReactElement, ReactElement];
}

const Dropbox = (props: DropboxProps): ReactElement => {
  const [header, content] = props.children;
  const { palette, shape } = useTheme();

  const [focused, setFocused] = React.useState(false);

  return (
    <Box sx={{ ...shape, border: `1px solid ${palette.divider}` }}>
      <Box
        sx={{
          display: "flex",

          padding: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }}>{header}</Box>
        <Box>
          <Anima type="rotate" in={focused}>
            <IconButton onClick={() => setFocused(!focused)}>
              <MdExpandMore />
            </IconButton>
          </Anima>
        </Box>
      </Box>
      <Collapse in={focused}>
        <Box sx={{ borderTop: `1px solid ${palette.divider}`, padding: 2 }}>
          {content}
        </Box>
      </Collapse>
    </Box>
  );
};

export default Dropbox;
