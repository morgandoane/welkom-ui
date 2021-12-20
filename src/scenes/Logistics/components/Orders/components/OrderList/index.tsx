import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { ReactElement } from "react";
import { MdFilter } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AppFab from "../../../../../../components/AppFab";
import AppNav from "../../../../../../components/AppNav";
import SearchField from "../../../../../../components/Forms/components/SearchField";
import PageTitle from "../../../../../../components/PageTitle";
import {
  OrdersArgs,
  useOrders,
} from "../../../../../../graphql/queries/orders/useOrders";
import { OrderContent } from "../../../../../../graphql/schema/Content/Content";

const OrderList = (): ReactElement => {
  const nav = useNavigate();
  const [filter, setFilter] = React.useState<OrdersArgs["filter"]>({
    skip: 0,
    take: 25,
  });

  const { data, error, loading } = useOrders({
    variables: { filter },
  });

  const orders = data ? data.orders.items : [];
  const count = data ? data.orders.count : 0;

  return (
    <AppNav loading={loading} error={error}>
      <PageTitle>Orders</PageTitle>
      <Box
        sx={{
          paddingBottom: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ maxWidth: 400 }}>
          <SearchField
            label={"Search by PO"}
            value={filter.code || ""}
            onChange={(val) => {
              setFilter({ ...filter, code: val || undefined });
            }}
          />
        </Box>
        <Button variant="outlined" startIcon={<MdFilter />}>
          Filters
        </Button>
      </Box>
      <DataGrid
        error={error}
        loading={loading}
        rows={orders.map((o) => ({ ...o, id: o._id }))}
        columns={[
          { field: "code", headerName: "PO number", width: 200 },
          {
            field: "customer",
            headerName: "Customer",
            valueGetter: (params) => params.row.customer.name,
            width: 200,
          },
          {
            field: "vendor",
            headerName: "Vendor",
            valueGetter: (params) => params.row.vendor.name,
            width: 200,
          },
          {
            field: "contents",
            headerName: "Items",
            valueGetter: (params) =>
              (params.row.contents as OrderContent[])
                .map((content) => content.item.english)
                .join(", "),
            width: 200,
          },
        ]}
      />
      <AppFab onClick={() => nav("new")}>New order</AppFab>
    </AppNav>
  );
};

export default OrderList;
