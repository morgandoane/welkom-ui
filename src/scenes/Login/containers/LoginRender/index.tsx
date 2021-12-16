import {
  Box,
  Button,
  Grow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ReactElement } from "react";
import { fullScreen } from "../../../../styles/fullScreen";
import { IoMdCloudOutline } from "react-icons/io";
import { AiOutlineTeam, AiOutlineNodeIndex } from "react-icons/ai";
import { FaTruckLoading } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { VscGraphLeft } from "react-icons/vsc";
import ViewFade from "../../../../components/ViewFade";

export interface LoginRenderProps {
  onClick: () => void;
  reset: () => void;
  loading: boolean;
  error: Error | null;
}

const DataCard = (props: { icon: ReactElement; message: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <Box sx={{ fontSize: "3rem", display: "flex" }}>{props.icon}</Box>
    <Typography color="textSecondary" variant="h6">
      {props.message}
    </Typography>
  </Box>
);

const LoginRender = (props: LoginRenderProps): ReactElement => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const large = useMediaQuery(theme.breakpoints.down("lg"));
  const { onClick, error, loading } = props;

  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (count == 5) {
        setCount(0);
        setIndex((i) => (i == 5 ? 0 : i + 1));
      } else {
        setCount(count + 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [count]);

  const tags = [
    "Information",
    "Traceability",
    "Procurement",
    "Production",
    "Pricing",
    "Management",
  ];

  const widths = [8.25, 8.2, 9.2, 7.8, 5.3, 9.3, 8.1];
  const responseiveMultiplier = small
    ? 0.72
    : medium
    ? 0.9
    : large
    ? 1.01
    : 1.1;

  return (
    <Box
      sx={{
        ...fullScreen,
        background: theme.palette.background.default,
        display: "flex",
        alignItems: "stretch",
        position: "relative",
      }}
    >
      <Box
        sx={{
          flex: 1,
          maxWidth: small ? "100%" : medium ? "77%" : large ? "68%" : "55%",
          padding: small ? 0 : 6,
          transition: theme.transitions.create(["maxWidth", "padding"], {
            duration: 250,
          }),
          display: "flex",
          flexFlow: "column",
        }}
      >
        <Grow in={!loading}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexFlow: "column",
              ...theme.shape,
              padding: 8,
              color: theme.palette.text.primary,
              gap: 4,
            }}
          >
            <Box>
              <Typography variant="h1" sx={{ paddingBottom: 1 }}>
                Little Dutch Boy
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: small ? "flex-start" : "center",
                  flexFlow: small ? "column" : "row",
                  gap: small ? 1 : 2,
                }}
              >
                <Box
                  sx={{
                    height: small ? 50 : medium ? 57 : large ? 70 : 80,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                    width: `calc(${widths[index] * responseiveMultiplier} * ${
                      theme.typography.h1.fontSize
                    })`,
                    transition: theme.transitions.create("width", {
                      duration: 500,
                    }),
                    marginLeft: small ? -2.5 : undefined,
                  }}
                >
                  {tags.map((tag, i) => (
                    <Typography
                      key={"tag_ " + tag}
                      sx={{
                        color: theme.palette.primary.main,
                        position: "absolute",
                        left: 16,
                        top: `calc(0px - calc(${index - i} * calc(
                              ${theme.typography.h1.fontSize} + ${theme.spacing(
                          5
                        )}
                            )))`,
                        transition: theme.transitions.create("top", {
                          duration: 500,
                        }),
                      }}
                      variant="h1"
                    >
                      {tag}
                    </Typography>
                  ))}
                </Box>
                <Box>
                  <Typography sx={{ flex: 1 }} variant="h1">
                    System
                  </Typography>
                </Box>
              </Box>
            </Box>
            <ViewFade index={index}>
              <Box>
                <DataCard
                  icon={<IoMdCloudOutline />}
                  message="A centralized platform for data collection and analysis."
                />
              </Box>
              <Box>
                <DataCard
                  icon={<AiOutlineNodeIndex />}
                  message="End-to-end traceability in seconds, not hours."
                />
              </Box>
              <Box>
                <DataCard
                  icon={<FaTruckLoading />}
                  message="Supply chain tracking for all inbound and outbound product."
                />
              </Box>
              <Box>
                <DataCard
                  icon={<BsGear />}
                  message="Managers and employees both benefit from automation."
                />
              </Box>
              <Box>
                <DataCard
                  icon={<VscGraphLeft />}
                  message="Granular insights into item and ingredient pricing."
                />
              </Box>
              <Box>
                <DataCard
                  icon={<AiOutlineTeam />}
                  message="Custom fit teams and permissions to dynamic job roles."
                />
              </Box>
            </ViewFade>
            <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
              <Button disabled variant="outlined" color="inherit" size="large">
                Request access
              </Button>
              <Button size="large" onClick={onClick}>
                Login
              </Button>
            </Box>
          </Box>
        </Grow>
      </Box>
    </Box>
  );
};

export default LoginRender;
