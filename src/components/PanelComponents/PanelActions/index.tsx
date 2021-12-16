import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import { uuid } from "uuidv4";
import PanelAction, { PanelActionProps } from "../PanelAction";

export interface PanelActionsProps {
  children: PanelActionProps[] | PanelActionProps;
}

const PanelActions = (props: PanelActionsProps): ReactElement => {
  const { children } = props;

  return (
    <Box sx={{ display: "flex", gap: 2, paddingBottom: 2 }}>
      {children instanceof Array ? (
        children.map((action) => <PanelAction key={uuid()} {...action} />)
      ) : (
        <PanelAction {...children} />
      )}
    </Box>
  );
};

export default PanelActions;
