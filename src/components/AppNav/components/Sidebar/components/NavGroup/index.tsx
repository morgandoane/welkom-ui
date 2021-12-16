import {
  Box,
  ButtonBase,
  Collapse,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ReactElement } from "react";
import { MdExpandMore } from "react-icons/md";
import { matchRoutes, RouteObject, useNavigate } from "react-router";
import Anima from "../../../../../Anima";

export interface NavGroupProps {
  label: string;
  icon: ReactElement;
  expanded: boolean;
  open?: boolean;
  items: { label: string; url: string; active?: boolean }[];
  onClick: (props: NavGroupProps) => void;
  navTo: string | null;
}

const NavGroup = (props: NavGroupProps): ReactElement => {
  const theme = useTheme();
  const nav = useNavigate();
  const { icon, label, expanded, items, open, onClick, navTo } = props;

  const data = matchRoutes(
    items.map(({ url: path }) => ({ path: path + "/*", caseSensitive: false })),
    location.pathname
  );

  const isActive = data !== null;

  return (
    <React.Fragment>
      <Box
        onClick={() => onClick(props)}
        sx={{
          cursor: "pointer",
          width: "100%",
          display: "flex",
          alignItems: "center",
          borderRadius: 24,
          justifyContent: "flex-start",
          color: isActive
            ? theme.palette.primary.main
            : theme.palette.text.secondary,
        }}
      >
        <Tooltip
          title={expanded ? "" : label}
          placement="right"
          arrow
          enterDelay={500}
        >
          <ButtonBase
            onClick={() => onClick(props)}
            disableRipple={expanded}
            sx={{
              width: 36,
              minWidth: 36,
              height: 36,
              display: "flex",
              borderRadius: 24,
              fontSize: "1.35rem",
            }}
          >
            {icon}
          </ButtonBase>
        </Tooltip>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            sx={{
              paddingLeft: 1,
            }}
          >
            {label}
          </Typography>
        </Box>
        {items.length > 1 && (
          <Box
            sx={{
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Anima type="rotate" in={Boolean(open) && expanded}>
              <Box sx={{ display: "flex" }}>
                <MdExpandMore />
              </Box>
            </Anima>
          </Box>
        )}
      </Box>
      {items.length > 1 && (
        <Collapse in={open && expanded}>
          <Box
            sx={{
              display: "flex",
              flexFlow: "column",
              alignItems: "flex-start",
              paddingLeft: 7,
            }}
          >
            {items.map((item, index) => (
              <ButtonBase
                onClick={() => nav(item.url)}
                sx={{ padding: 0.5, borderRadius: 2 }}
                key={"item_" + index + "_" + item.label}
              >
                <Typography
                  variant="body2"
                  sx={
                    data &&
                    data
                      .map((d) => d.pathname)
                      .join("")
                      .includes(item.url)
                      ? { color: theme.palette.primary.main }
                      : { color: theme.palette.text.secondary }
                  }
                >
                  {item.label}
                </Typography>
              </ButtonBase>
            ))}
          </Box>
        </Collapse>
      )}
    </React.Fragment>
  );
};

export default NavGroup;
