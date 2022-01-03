import { CircularProgress, Fab, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import { MdAdd } from "react-icons/md";
import { uuid } from "uuidv4";
import AppNav from "../../../../components/AppNav";
import ColumnBox from "../../../../components/Layout/ColumnBox";
import PageTitle from "../../../../components/PageTitle";
import { OrderQueueContentInputState } from "../../../../graphql/schema/OrderQueue/OrderQueueInput";
import { useOrderQueue } from "../../../../graphql/queries/orderQueue/useOrderQueue";
import ItemDrawer from "./components/ItemDrawer";
import OrderQueueTable from "./components/OrderQueueTable";
import { useOrderQueueUpdate } from "../../../../graphql/mutations/orderQueue/updateOrderQueue";
import Message from "../../../../components/Message";

const threshold = 1000;

const OrderQueue = (): ReactElement => {
  const [contents, setContents] = React.useState<OrderQueueContentInputState[]>(
    []
  );

  const [open, setOpen] = React.useState(false);

  const [timer, setTimer] = React.useState(0);

  const { error, loading } = useOrderQueue({
    onCompleted: (data) => {
      setContents(
        data.orderQueue.contents.map((c) => ({
          id: uuid(),
          order_code: c.order_code || undefined,
          item: c.item ? c.item._id : undefined,
          quantity: c.quantity !== null ? c.quantity : undefined,
          unit: c.unit ? c.unit._id : undefined,
          location: c.location ? c.location._id : undefined,
          date: c.date ? new Date(c.date) : undefined,
        }))
      );
    },
  });

  const [update, { loading: updateLoading }] = useOrderQueueUpdate({
    variables: {
      contents: contents.map(({ id, ...rest }) => rest),
    },
  });

  React.useEffect(() => {
    if (timer !== 0) {
      const timeout = setTimeout(() => {
        setTimer((t) => t - threshold / 5);
      }, threshold / 5);

      return () => clearTimeout(timeout);
    } else {
      update();
    }
  }, [timer]);

  return (
    <AppNav loading={loading} error={error}>
      <ColumnBox>
        {{
          header: <PageTitle>Order Queue</PageTitle>,
          content: (
            <OrderQueueTable
              contents={contents}
              setContents={(data) => {
                setTimer(threshold);
                setContents(data);
              }}
            />
          ),
          footer: (
            <Box sx={{ display: "flex" }}>
              <Box>
                {updateLoading || timer !== 0 ? (
                  <Message type="Loading" size={40} />
                ) : (
                  <Message type="Success" size={40} />
                )}
              </Box>
              <Box sx={{ flex: 1 }} />
              <Box>
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={() => setOpen(true)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      fontSize: "1.5rem",
                      paddingRight: 1,
                    }}
                  >
                    <MdAdd />
                  </Box>
                  Item
                </Fab>
              </Box>
            </Box>
          ),
        }}
      </ColumnBox>
      <ItemDrawer
        open={open}
        onClose={() => setOpen(false)}
        contents={contents}
        addItem={(item) => {
          setTimer(threshold);
          setContents([
            ...contents,
            {
              id: uuid(),
              item: item._id,
            },
          ]);
        }}
      />
    </AppNav>
  );
};

export default OrderQueue;
