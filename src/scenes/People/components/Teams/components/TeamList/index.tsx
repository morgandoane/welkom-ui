import { Box, Button, Fab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { ReactElement } from "react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getUiPermissions } from "../../../../../../auth/UiPermission";
import AppNav from "../../../../../../components/AppNav";
import SearchField from "../../../../../../components/Forms/components/SearchField";
import ColumnBox from "../../../../../../components/Layout/ColumnBox";
import PageTitle from "../../../../../../components/PageTitle";
import { useTeams } from "../../../../../../graphql/queries/team/useTeams";
import { TeamFilter } from "../../../../../../graphql/schema/Team/TeamFilter";

const TeamList = (): ReactElement => {
  const nav = useNavigate();

  const [filter, setFilter] = React.useState<TeamFilter>({ skip: 0, take: 25 });

  const { data, error, loading } = useTeams({
    variables: { filter },
  });

  const count = data ? data.teams.count : 0;
  const teams = data ? data.teams.items : [];

  return (
    <AppNav>
      <ColumnBox>
        {{
          header: (
            <Box>
              <PageTitle>Teams</PageTitle>
              <Box
                sx={{ display: "flex", alignItems: "center", paddingBottom: 1 }}
              >
                <Box>
                  <SearchField
                    value={filter.name || ""}
                    onChange={(val) =>
                      setFilter({ ...filter, name: val || "" })
                    }
                    label="Search teams"
                  />
                </Box>
                <Box sx={{ flex: 1 }} />
                <Fab
                  onClick={() => nav("/people/teams/new")}
                  variant="extended"
                  color="primary"
                >
                  <Box
                    sx={{
                      display: "flex",
                      paddingRight: 1,
                      fontSize: "1.25rem",
                    }}
                  >
                    <MdAdd />
                  </Box>
                  New team
                </Fab>
              </Box>
            </Box>
          ),
          content: (
            <DataGrid
              pagination
              paginationMode="server"
              rowsPerPageOptions={[25]}
              rowCount={count}
              error={error}
              loading={loading}
              rows={teams.map((o) => ({ ...o, id: o._id }))}
              onRowClick={(params) => nav(params.row._id)}
              columns={[
                {
                  field: "company",
                  headerName: "Company",
                  width: 200,
                  valueGetter: (params) => params.row.company.name,
                },
                {
                  field: "name",
                  headerName: "Team name",
                  width: 200,
                },
                {
                  field: "description",
                  headerName: "Description",
                  width: 200,
                },
                {
                  field: "members",
                  headerName: "Members",
                  width: 200,
                  valueGetter: (params) => params.row.members.length,
                },
                {
                  field: "permissions",
                  headerName: "Permissions",
                  width: 600,
                  valueGetter: (params) =>
                    getUiPermissions(params.row.permissions)
                      .map((p) => p.name)
                      .join(", "),
                },
              ]}
            />
          ),
        }}
      </ColumnBox>
    </AppNav>
  );
};

export default TeamList;
