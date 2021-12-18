import { Box, Button, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import AppNav from "../../../../../../components/AppNav";
import ColumnBox from "../../../../../../components/Layout/ColumnBox";
import PageTitle from "../../../../../../components/PageTitle";
import TabFade from "../../../../../../components/TabFade";
import { useUnit } from "../../../../../../graphql/queries/units/useUnit";
import UnitDetails from "./components/UnitDetails";

const UnitView = (): ReactElement => {
  const { id } = useParams();
  const nav = useNavigate();

  const { data, error, loading, refetch } = useUnit({
    variables: { id: id || "" },
    skip: !id || id == "",
    fetchPolicy: "network-only",
  });

  const unit = !data ? null : data.unit;

  return (
    <AppNav error={error} loading={loading}>
      <Box sx={{ height: "100%" }}>
        {unit && (
          <ColumnBox>
            {{
              header: (
                <Box>
                  <Button
                    variant="text"
                    color="inherit"
                    startIcon={<MdChevronLeft />}
                    sx={{ marginBottom: 2 }}
                    onClick={() => nav("/library/units")}
                  >
                    Units
                  </Button>
                  <PageTitle>{unit.english}</PageTitle>
                  {unit.deleted && (
                    <Typography sx={{ marginTop: -1 }} color="error.main">
                      <em>Deleted!</em>
                    </Typography>
                  )}
                </Box>
              ),
              content: (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexFlow: "column",
                    overflow: "hidden",
                  }}
                >
                  <TabFade>
                    {{
                      Details: (
                        <UnitDetails unit={unit} refetch={() => refetch()} />
                      ),
                    }}
                  </TabFade>
                </Box>
              ),
            }}
          </ColumnBox>
        )}
      </Box>
    </AppNav>
  );
};

export default UnitView;
