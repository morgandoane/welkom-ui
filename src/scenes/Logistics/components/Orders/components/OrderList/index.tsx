import { Box, Button, Chip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { addDays, endOfDay, format, startOfDay } from "date-fns";
import React, { ReactElement } from "react";
import { MdCheck, MdFilter } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AppFab from "../../../../../../components/AppFab";
import AppNav from "../../../../../../components/AppNav";
import Filters from "../../../../../../components/Filters";
import CompanyField from "../../../../../../components/Forms/components/CompanyField";
import DateRangeField from "../../../../../../components/Forms/components/DateRangeField";
import ItemField from "../../../../../../components/Forms/components/ItemField";
import SearchField from "../../../../../../components/Forms/components/SearchField";
import PageTitle from "../../../../../../components/PageTitle";
import PanelHeader from "../../../../../../components/PanelComponents/PanelHeader";
import SideDrawer from "../../../../../../components/SideDrawer";
import {
  OrdersArgs,
  useOrders,
} from "../../../../../../graphql/queries/orders/useOrders";
import { useOrderSetup } from "../../../../../../graphql/queries/orders/useOrderSetup";
import { OrderContent } from "../../../../../../graphql/schema/Content/Content";
import { dateFormats } from "../../../../../../utils/dateFormats";

const OrderList = (): ReactElement => {
  const nav = useNavigate();
  const [filter, setFilter] = React.useState<OrdersArgs["filter"]>({
    skip: 0,
    take: 25,
  });

  const [filterEdits, setFilterEdits] = React.useState<
    OrdersArgs["filter"] | null
  >(null);

  const {
    data: { items, companies, units, profiles },
    loading: setupLoading,
  } = useOrderSetup();

  const { data, error, loading } = useOrders({
    variables: { filter },
  });

  const orders = data ? data.orders.items : [];
  const count = data ? data.orders.count : 0;

  const filterCustomer = companies.find((c) => c._id === filter.customer);
  const filterVendor = companies.find((c) => c._id === filter.vendor);
  const filterItem = items.find((c) => c._id === filter.item);
  const filterRange = !filter.due
    ? null
    : `${format(filter.due.start, dateFormats.condensedDate)} - ${format(
        filter.due.start,
        dateFormats.condensedDate
      )}`;

  const filterChips = {
    PO: filter.code ? (
      <Chip
        color="primary"
        label={`PO number includes: ${filter.code}`}
        onDelete={() => {
          const copy = { ...filter };
          copy.customer = undefined;
          setFilter(copy);
        }}
      />
    ) : null,
    Customer: filterCustomer ? (
      <Chip
        color="primary"
        label={`Customer: ${filterCustomer.name}`}
        onDelete={() => {
          const copy = { ...filter };
          copy.customer = undefined;
          setFilter(copy);
        }}
      />
    ) : null,
    Vendor: filterVendor ? (
      <Chip
        color="primary"
        label={`Vendor: ${filterVendor.name}`}
        onDelete={() => {
          const copy = { ...filter };
          copy.vendor = undefined;
          setFilter(copy);
        }}
      />
    ) : null,
    Item: filterItem ? (
      <Chip
        color="primary"
        label={`Item: ${filterItem.english}`}
        onDelete={() => {
          const copy = { ...filter };
          copy.item = undefined;
          setFilter(copy);
        }}
      />
    ) : null,
    Date: filterRange ? (
      <Chip
        color="primary"
        label={`Due between: ${filterRange}`}
        onDelete={() => {
          const copy = { ...filter };
          copy.due = undefined;
          setFilter(copy);
        }}
      />
    ) : null,
  };

  const showChips = () => {
    const { PO, ...rest } = filterChips;
    if (Object.values(rest).some((val) => val !== null && val !== undefined))
      return true;
    else return false;
  };

  return (
    <AppNav loading={loading || setupLoading} error={error}>
      <PageTitle>Orders</PageTitle>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ marginBottom: 2, maxWidth: 400 }}
      >
        This table shows all orders, whether they were created automatically in
        the queue, or manually in a form.
      </Typography>
      <Box
        sx={{
          paddingBottom: 1,
          display: "flex",
          flexFlow: "row",
        }}
      >
        <Box sx={{ display: "flex", flex: 1 }}>
          {showChips() ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {Object.keys(filterChips).map((key) => {
                return filterChips[key as keyof typeof filterChips];
              })}
            </Box>
          ) : (
            <Box>
              <SearchField
                label={"Search by PO"}
                value={filter.code || ""}
                onChange={(val) => {
                  setFilter({ ...filter, code: val || undefined });
                }}
              />
            </Box>
          )}
        </Box>
        <Button
          variant="outlined"
          startIcon={<MdFilter />}
          onClick={() => setFilterEdits(filter)}
        >
          Filters
        </Button>
      </Box>
      <DataGrid
        pagination
        paginationMode="server"
        rowsPerPageOptions={[25]}
        rowCount={count}
        error={error}
        loading={loading}
        rows={orders.map((o) => ({ ...o, id: o._id }))}
        onRowClick={(params) => nav(params.row._id)}
        columns={[
          { field: "code", headerName: "PO number", width: 200 },
          {
            field: "vendor",
            headerName: "Vendor",
            valueGetter: (params) => params.row.vendor.name,
            width: 200,
          },
          {
            field: "customer",
            headerName: "Customer",
            valueGetter: (params) => params.row.customer.name,
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
      <SideDrawer
        open={Boolean(filterEdits)}
        onClose={() => setFilterEdits(null)}
        wide
      >
        <PanelHeader onClose={() => setFilterEdits(null)}>
          Order filters
        </PanelHeader>
        <Filters>
          {{
            Customer: [
              <CompanyField
                naked
                key="companyFilter"
                value={filterEdits ? filterEdits.customer || "" : ""}
                onChange={(val) => {
                  if (filterEdits)
                    setFilterEdits({ ...filterEdits, customer: val || "" });
                }}
              />,
              filterEdits !== null && filterEdits.customer !== undefined,
              (checked) => {
                if (filterEdits) {
                  setFilterEdits({
                    ...filterEdits,
                    customer: checked ? "" : undefined,
                  });
                }
              },
            ],
            Vendor: [
              <CompanyField
                naked
                key="vendorFilter"
                value={filterEdits ? filterEdits.vendor || "" : ""}
                onChange={(val) => {
                  if (filterEdits)
                    setFilterEdits({ ...filterEdits, vendor: val || "" });
                }}
              />,
              filterEdits !== null && filterEdits.vendor !== undefined,
              (checked) => {
                if (filterEdits) {
                  setFilterEdits({
                    ...filterEdits,
                    vendor: checked ? "" : undefined,
                  });
                }
              },
            ],
            Item: [
              <ItemField
                naked
                key="itemFilter"
                value={filterEdits ? filterEdits.item || "" : ""}
                onChange={(val) => {
                  if (filterEdits)
                    setFilterEdits({ ...filterEdits, item: val || "" });
                }}
              />,
              filterEdits !== null && filterEdits.item !== undefined,
              (checked) => {
                if (filterEdits) {
                  setFilterEdits({
                    ...filterEdits,
                    item: checked ? "" : undefined,
                  });
                }
              },
            ],
            ["Due date range"]: [
              <DateRangeField
                naked
                key="itemFilter"
                value={filterEdits ? filterEdits.due || null : null}
                onChange={(val) => {
                  if (filterEdits)
                    setFilterEdits({ ...filterEdits, due: val || undefined });
                }}
              />,
              filterEdits !== null && filterEdits.due !== undefined,
              (checked) => {
                if (filterEdits) {
                  setFilterEdits({
                    ...filterEdits,
                    due: checked
                      ? {
                          start: startOfDay(addDays(new Date(), -7)),
                          end: endOfDay(new Date()),
                        }
                      : undefined,
                  });
                }
              },
            ],
          }}
        </Filters>
        <Box sx={{ paddingTop: 4 }}>
          <Button
            onClick={() => {
              if (filterEdits) {
                const copy = { ...filterEdits };
                setFilter(copy);
                setFilterEdits(null);
              }
            }}
            endIcon={<MdCheck />}
          >
            Apply filters
          </Button>
        </Box>
      </SideDrawer>
    </AppNav>
  );
};

export default OrderList;
