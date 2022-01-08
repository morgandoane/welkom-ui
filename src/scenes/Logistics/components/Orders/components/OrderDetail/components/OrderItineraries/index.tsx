import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  Popover,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ReactElement } from "react";
import { MdAdd, MdEdit, MdLocalShipping } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AppFab from "../../../../../../../../components/AppFab";
import BolPreview from "../../../../../../../../components/BolPreview";
import Dropbox from "../../../../../../../../components/Dropbox";
import { Order } from "../../../../../../../../graphql/schema/Order/Order";

export interface OrderBolsProps {
  order: Order;
}

const OrderItineraries = (props: OrderBolsProps): ReactElement => {
  const { order } = props;
  const nav = useNavigate();

  const { palette, shape } = useTheme();

  const [preview, setPreview] = React.useState<null | {
    id: string;
    element: EventTarget & HTMLButtonElement;
  }>(null);

  const open = Boolean(preview);
  const id = open ? "bol-popover" : undefined;

  return (
    <Box sx={{ paddingTop: 3 }}>
      <Box sx={{ display: "flex", flexFlow: "column", gap: 2 }}>
        {order.itineraries.map((itinerary) => (
          <Dropbox key={itinerary._id}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ fontSize: "2rem", color: palette.text.secondary }}>
                    <MdLocalShipping />
                  </Box>
                  <Box>
                    <Typography>{itinerary.code}</Typography>
                    <Typography color="textSecondary" variant="body2">
                      {itinerary.carrier
                        ? "Carried by " + itinerary.carrier.name
                        : "No carrier assigned"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ paddingRight: 2 }}>
                <Tooltip title="Edit Itinerary" arrow placement="top">
                  <IconButton
                    sx={{ fontSize: "1rem" }}
                    onClick={() => nav(`itineraries/${itinerary._id}`)}
                  >
                    <MdEdit />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Box>
              <Typography
                color="textSecondary"
                variant="body2"
              >{`This itinerary contains ${itinerary.bols.length} bol${
                itinerary.bols.length == 1 ? "" : "s"
              }.`}</Typography>
              <Box
                sx={{
                  paddingTop: 1,
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "start",
                  paddingBottom: 1,
                }}
              >
                {itinerary.bols.map((bol) => (
                  <React.Fragment key={bol._id}>
                    <ButtonBase
                      onClick={(e) => {
                        setPreview({ element: e.currentTarget, id: bol._id });
                      }}
                      sx={{ paddingTop: 0.5, paddingBottom: 0.5 }}
                    >
                      {bol.code || "Pending BOL"}
                    </ButtonBase>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={preview ? preview.element : null}
                      onClose={() => setPreview(null)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <BolPreview id={preview ? preview.id : ""} />
                    </Popover>
                  </React.Fragment>
                ))}
              </Box>
              <Button
                size="small"
                startIcon={<MdAdd />}
                variant="text"
                onClick={() =>
                  nav(
                    `/logistics/orders/${order._id}/itineraries/${itinerary._id}/bols/new`
                  )
                }
              >
                BOL
              </Button>
            </Box>
          </Dropbox>
        ))}
      </Box>
      <AppFab onClick={() => nav("itineraries/new")}>
        Add itinerary to order
      </AppFab>
    </Box>
  );
};

export default OrderItineraries;
