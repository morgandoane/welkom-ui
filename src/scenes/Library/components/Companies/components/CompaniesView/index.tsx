import { LoadingButton } from "@mui/lab";
import { Box, Fab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { ReactElement } from "react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AppNav from "../../../../../../components/AppNav";
import FormRow from "../../../../../../components/Forms/components/FormRow";
import SearchField from "../../../../../../components/Forms/components/SearchField";
import TextFormField from "../../../../../../components/Forms/components/TextFormField";
import ColumnBox from "../../../../../../components/Layout/ColumnBox";
import PageTitle from "../../../../../../components/PageTitle";
import PanelHeader from "../../../../../../components/PanelComponents/PanelHeader";
import SideDrawer from "../../../../../../components/SideDrawer";
import {
  CreateCompanyArgs,
  CreateCompanyRes,
  useCompanyCreation,
} from "../../../../../../graphql/mutations/company/useCompanyCreation";
import { useTinyCompanies } from "../../../../../../graphql/queries/companies/useTinyCompanies";
import { CompanyFilter } from "../../../../../../graphql/schema/Company/CompanyFilter";
import { OperationResult } from "../../../../../../graphql/types";

const CompaniesView = (): ReactElement => {
  const nav = useNavigate();

  const [filter, setFilter] = React.useState<CompanyFilter>({
    skip: 0,
    take: 20,
  });

  const { data, error, loading } = useTinyCompanies({ variables: { filter } });

  const count = data ? data.companies.count : 0;
  const companies = data ? data.companies.items : [];

  const [result, setResult] =
    React.useState<OperationResult<CreateCompanyRes> | null>(null);

  const [edits, setEdits] = React.useState<CreateCompanyArgs["data"] | null>(
    null
  );

  const [create, { loading: createLoading }] = useCompanyCreation({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
  });

  const onClose = () => {
    setEdits(null);
    setResult(null);
  };

  return (
    <AppNav loading={loading} error={error}>
      <ColumnBox>
        {{
          header: (
            <Box sx={{ display: "flex", paddingBottom: 2 }}>
              <Box>
                <PageTitle>Companies</PageTitle>
                <SearchField
                  label="Search"
                  value={filter.name || ""}
                  onChange={(val) => {
                    setFilter({ ...filter, name: val || "" });
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }} />
              <Box>
                <Fab
                  onClick={() => setEdits({ name: "" })}
                  color="primary"
                  variant="extended"
                >
                  <Box
                    sx={{
                      display: "flex",
                      fontSize: "1.375rem",
                      paddingRight: 1,
                    }}
                  >
                    <MdAdd />
                  </Box>
                  Company
                </Fab>
              </Box>
            </Box>
          ),
          content: (
            <DataGrid
              onRowClick={(params) => nav(params.row.id)}
              loading={loading}
              rowsPerPageOptions={[50]}
              paginationMode="server"
              pageSize={filter.take}
              rowCount={count}
              rows={companies.map((c) => ({ ...c, id: c._id }))}
              columns={[{ field: "name", width: 200, headerName: "Name" }]}
              onPageChange={(page) => {
                setFilter({
                  ...filter,
                  skip: page == 0 ? 0 : filter.take * page,
                });
              }}
            />
          ),
        }}
      </ColumnBox>
      <SideDrawer
        open={Boolean(edits)}
        onClose={onClose}
        error={result && result.success == false ? result.error : undefined}
        success={
          result && result.success == true ? "Company created!" : undefined
        }
        onSuccess={() => {
          if (result && result.success == true) {
            setEdits(null);
            setResult(null);
            nav(result.data.createCompany._id);
          }
        }}
      >
        <PanelHeader onClose={onClose}>Create company</PanelHeader>
        <FormRow>
          <TextFormField
            label="Name"
            value={edits ? edits.name : ""}
            onChange={(val) => {
              if (edits) setEdits({ name: val || "" });
            }}
          />
        </FormRow>
        <LoadingButton
          variant="contained"
          loading={createLoading}
          onClick={() => {
            if (edits) create({ variables: { data: edits } });
          }}
        >
          Create!
        </LoadingButton>
      </SideDrawer>
    </AppNav>
  );
};

export default CompaniesView;
