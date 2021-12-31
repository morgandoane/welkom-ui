import {
  Box,
  IconButton,
  useTheme,
  Button,
  capitalize,
  Tooltip,
} from "@mui/material";
import React, { ReactElement } from "react";
import { AiFillBuild, AiOutlineNodeIndex } from "react-icons/ai";
import { FaHandsHelping, FaTruckLoading } from "react-icons/fa";
import {
  MdAccountCircle,
  MdChevronRight,
  MdDarkMode,
  MdDescription,
  MdDocumentScanner,
  MdFolderOpen,
  MdLightMode,
} from "react-icons/md";
import { VscGraphLeft } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { useThemeContext } from "../../../../providers/AppThemeProvider";
import Anima from "../../../Anima";
import NavGroup, { NavGroupProps } from "./components/NavGroup";

const duration = 200;
const Sidebar = (): ReactElement => {
  const { mode, setMode } = useThemeContext();
  const theme = useTheme();
  const nav = useNavigate();
  const fromStorage = localStorage.getItem("sidebar_expanded");
  const [expanded, setExpanded] = React.useState(
    fromStorage == "false" ? false : true
  );

  React.useEffect(() => {
    localStorage.setItem("sidebar_expanded", expanded ? "true" : "false");
  }, [expanded]);

  const focusedFromStorage = localStorage.getItem("sidebar_focus");

  const [focused, setFocused] = React.useState(focusedFromStorage || "");

  const [navTo, setNavTo] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (navTo) {
      const timeout = setTimeout(() => {
        setNavTo(null);
        nav(navTo);
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [navTo, nav]);

  React.useEffect(() => {
    localStorage.setItem("sidebar_focus", focused);
  }, [focused]);

  const click = ({ items, label }: NavGroupProps) => {
    if (items.length == 1) {
      setFocused("");
      setNavTo(items[0].url);
    } else if (items.length > 1) {
      setExpanded(true);
      setFocused(focused == label ? "" : label);
    }
  };

  const iconStyle: React.CSSProperties = {
    marginBottom: "4px",
  };

  const groups: {
    items: NavGroupProps["items"];
    label: string;
    icon: ReactElement;
  }[] = [
    {
      icon: <MdDocumentScanner style={iconStyle} />,
      label: "Configuration",
      items: [{ label: "Configuration", url: "/configuration" }],
    },
    {
      icon: <FaHandsHelping style={iconStyle} />,
      label: "Contracts",
      items: [{ label: "Contracts", url: "/contracts" }],
    },
    {
      icon: <MdFolderOpen style={iconStyle} />,
      label: "Library",
      items: [
        { label: "Companies", url: "/library/companies" },
        { label: "Items", url: "/library/items" },
        { label: "Units", url: "/library/units" },
      ],
    },
    {
      icon: <FaTruckLoading style={iconStyle} />,
      label: "Logistics",
      items: [
        { label: "Order Queue", url: "/logistics/orderqueue" },
        { label: "Orders", url: "/logistics/orders" },
        { label: "BOLs", url: "/logistics/bols" },
      ],
    },

    {
      icon: <MdAccountCircle style={iconStyle} />,
      label: "People",
      items: [
        { label: "Teams", url: "/people/teams" },
        { label: "Users", url: "/people/users" },
        { label: "Policies", url: "/people/policies" },
      ],
    },
    {
      icon: <AiFillBuild style={iconStyle} />,
      label: "Production",
      items: [
        { label: "Mixing", url: "/production/mixing" },
        { label: "Packing", url: "/production/packing" },
        { label: "Scheduling", url: "/production/scheduling" },
      ],
    },
    {
      icon: <MdDescription style={iconStyle} />,
      label: "Recipes",
      items: [{ label: "Recipes", url: "/recipes" }],
    },
    {
      icon: <VscGraphLeft style={iconStyle} />,
      label: "Reporting",
      items: [
        { label: "App Usage", url: "/reporting/appusage" },
        { label: "Pricing", url: "/reporting/pricing" },
        { label: "Production", url: "/reporting/production" },
        { label: "Supply Chain", url: "/reporting/supplychain" },
      ],
    },
    {
      icon: <AiOutlineNodeIndex style={iconStyle} />,
      label: "Traceabaility",
      items: [
        { label: "Lots", url: "/traceability/lots" },
        { label: "Holds", url: "/traceability/holds" },
        { label: "Recalls", url: "/traceability/recalls" },
      ],
    },
    {
      icon: <FaTruckLoading style={iconStyle} />,
      label: "Warehouse",
      items: [
        { label: "Shipping", url: "/warehouse/shipping" },
        { label: "Receiving", url: "/warehouse/receiving" },
      ],
    },
  ];

  const navGroups: NavGroupProps[] = groups.map((group) => ({
    ...group,
    navTo,
    onClick: (d) => click(d),
    expanded: expanded,
    open: focused === group.label,
  }));

  return (
    <Box
      sx={{
        background: theme.palette.background.paper,
        padding: 2,
        display: "flex",
        flexFlow: "column",
        alignItems: "flex-start",
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: expanded ? 200 : 36,
          transition: theme.transitions.create("width", { duration: duration }),
          overflow: "hidden",
          display: "flex",
          flexFlow: "column",
          gap: 0.5,
        }}
      >
        {navGroups.map((group, index) => (
          <NavGroup {...group} key={"group_" + index} />
        ))}
      </Box>
      <Tooltip title="Color theme" placement="right" arrow>
        <IconButton onClick={() => setMode(mode == "dark" ? "light" : "dark")}>
          {mode == "dark" ? <MdDarkMode /> : <MdLightMode />}
        </IconButton>
      </Tooltip>
      <Anima in={expanded} type="rotate">
        <IconButton onClick={() => setExpanded(!expanded)}>
          <MdChevronRight />
        </IconButton>
      </Anima>
    </Box>
  );
};

export default Sidebar;
