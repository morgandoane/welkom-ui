import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import AppNav from "../../../../../../components/AppNav";
import ColumnBox from "../../../../../../components/Layout/ColumnBox";
import PageTitle from "../../../../../../components/PageTitle";
import TabFade from "../../../../../../components/TabFade";
import { useOrder } from "../../../../../../graphql/queries/orders/Order";
import { useOrderSetup } from "../../../../../../graphql/queries/orders/useOrderSetup";
import OrderAttachments from "./components/OrderAttachments";
import OrderItineraries from "./components/OrderItineraries";
import OrderContents from "./components/OrderContents";
import OrderDetails from "./components/OrderDetails";

const OrderDetail = (): ReactElement => {
  const { id } = useParams();
  const nav = useNavigate();

  const { loading: setupLoading, data: setupData } = useOrderSetup();

  const { data, error, loading, refetch } = useOrder({
    variables: !id || id == "" ? undefined : { id },
    skip: !id || id == "",
  });

  const order = data ? data.order : null;

  return (
    <AppNav loading={loading} error={error}>
      {order && (
        <ColumnBox>
          {{
            header: (
              <Box>
                <Button
                  onClick={() => nav("/logistics/orders")}
                  color="inherit"
                  variant="text"
                  startIcon={<MdChevronLeft />}
                >
                  orders
                </Button>
                <PageTitle>{order.code}</PageTitle>
                {(order.customer || order.vendor) && (
                  <Box
                    sx={{
                      paddingBottom: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography variant="h5">
                      {order.vendor ? order.vendor.name : ""}
                    </Typography>
                    <Box sx={{ display: "flex", fontSize: "1.5rem" }}>
                      <MdChevronRight />
                    </Box>
                    <Typography variant="h5">
                      {order.customer ? order.customer.name : ""}
                    </Typography>
                  </Box>
                )}
              </Box>
            ),
            content: (
              <TabFade>
                {{
                  ["Order details"]: <OrderDetails order={order} />,
                  Contents: <OrderContents order={order} data={setupData} />,
                  Itineraries: <OrderItineraries order={order} />,
                  Documents: (
                    <OrderAttachments refetch={() => refetch()} order={order} />
                  ),
                }}
              </TabFade>
            ),
          }}
        </ColumnBox>
      )}
    </AppNav>
  );
};

export default OrderDetail;
