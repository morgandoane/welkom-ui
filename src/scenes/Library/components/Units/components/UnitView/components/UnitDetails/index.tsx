import { LoadingButton } from "@mui/lab";
import { Box, Button, useTheme } from "@mui/material";
import { format } from "date-fns";
import React, { ReactElement } from "react";
import { MdEdit } from "react-icons/md";
import AppFab from "../../../../../../../../components/AppFab";
import Details from "../../../../../../../../components/Details";
import CarefulButton from "../../../../../../../../components/Forms/CarefulButton";
import FormRow from "../../../../../../../../components/Forms/components/FormRow";
import TextFormField from "../../../../../../../../components/Forms/components/TextFormField";
import PanelHeader from "../../../../../../../../components/PanelComponents/PanelHeader";
import SideDrawer from "../../../../../../../../components/SideDrawer";
import {
  Unit,
  UnitClass,
} from "../../../../../../../../graphql/schema/Unit/Unit";
import { OperationResult } from "../../../../../../../../graphql/types";
import { dateFormats } from "../../../../../../../../utils/dateFormats";
import { MdRefresh } from "react-icons/md";
import {
  UpdateUnitArgs,
  UpdateUnitRes,
  useUnitUpdate,
} from "../../../../../../../../graphql/mutations/unit/useUnitUpdate";
import NumberField from "../../../../../../../../components/Forms/components/NumberField";
import { fraction } from "../../../../../../../../utils/fraction";
import UnitClassField from "../../../../../../../../components/Forms/components/UnitClassField";

export const BaseUnits: Record<UnitClass, [string, string]> = {
  [UnitClass.Count]: ["Count", "Counts"],
  [UnitClass.Time]: ["Minute", "Minutes"],
  [UnitClass.Volume]: ["Gallon", "Gallons"],
  [UnitClass.Weight]: ["Pound", "Pounds"],
};

export interface UnitDetailsProps {
  unit: Unit;
  refetch: () => void;
}

const UnitDetails = (props: UnitDetailsProps): ReactElement => {
  const theme = useTheme();
  const { unit, refetch } = props;

  const [state, setState] = React.useState<UpdateUnitArgs | null>(null);

  const [result, setResult] =
    React.useState<OperationResult<UpdateUnitRes> | null>(null);

  const [update, { loading }] = useUnitUpdate({
    onCompleted: (data) => {
      if (data.updateUnit.deleted) {
        setState(null);
      } else {
        setResult({ success: true, data });
      }
    },
    onError: (error) => setResult({ success: false, error }),
  });

  const onClose = () => {
    setResult(null);
    setState(null);
  };

  return (
    <Box sx={{ paddingTop: 4 }}>
      <Details gap={4}>
        {[
          { key: "English", value: unit.english },
          { key: "Spanish", value: unit.spanish },
          {
            key: "Base equivelant",
            value: `${fraction(unit.base_per_unit)} ${
              BaseUnits[unit.class][unit.base_per_unit == 1 ? 0 : 1]
            }`,
          },
          { key: "Created by", value: unit.created_by.name },
          {
            key: "Date created",
            value: format(
              new Date(unit.date_created),
              dateFormats.condensedDate
            ),
          },
          {
            key: "Last modified by",
            value: !unit.modified_by ? "-" : unit.modified_by.name,
          },
          {
            key: "Date modified",
            value: !unit.date_modified
              ? "Never"
              : format(new Date(unit.date_modified), dateFormats.condensedDate),
          },
        ]}
      </Details>

      {unit.deleted ? (
        <AppFab
          disabled={loading}
          sx={{
            backgroundColor: theme.palette.error.main,
            "&:hover": {
              backgroundColor: theme.palette.error.dark,
            },
          }}
          icon={<MdRefresh />}
          onClick={() => {
            update({
              variables: {
                id: unit._id,
                data: {
                  english: unit.english,
                  spanish: unit.spanish,
                  english_plural: unit.english_plural,
                  spanish_plural: unit.spanish_plural,
                  deleted: false,
                  base_per_unit: unit.base_per_unit,
                },
              },
            });
          }}
        >
          Reinstate
        </AppFab>
      ) : (
        <AppFab
          icon={<MdEdit />}
          onClick={() => {
            setState({
              id: unit._id,
              data: {
                english: unit.english,
                spanish: unit.spanish,
                spanish_plural: unit.spanish_plural,
                english_plural: unit.english_plural,
                class: unit.class,
                deleted: false,
                base_per_unit: unit.base_per_unit,
              },
            });
          }}
        >
          Edit
        </AppFab>
      )}
      <SideDrawer
        loading={loading}
        open={Boolean(state)}
        onClose={onClose}
        error={result && result.success == false ? result.error : undefined}
        success={result && result.success == true ? "Unit saved" : undefined}
      >
        <PanelHeader onClose={onClose}>{`Update ${unit.english}`}</PanelHeader>
        <Box p={1} />
        <FormRow>
          <TextFormField
            disabled={loading}
            label="English"
            value={state ? state.data.english || "" : ""}
            onChange={(val) => {
              if (state)
                setState({
                  ...state,
                  data: { ...state.data, english: val || "" },
                });
            }}
          />
          <TextFormField
            disabled={loading}
            label="English plural"
            value={state ? state.data.english_plural || "" : ""}
            onChange={(val) => {
              if (state)
                setState({
                  ...state,
                  data: { ...state.data, english_plural: val || "" },
                });
            }}
          />
        </FormRow>
        <FormRow>
          <TextFormField
            disabled={loading}
            label="Spanish"
            value={state ? state.data.spanish || "" : ""}
            onChange={(val) => {
              if (state)
                setState({
                  ...state,
                  data: { ...state.data, spanish: val || "" },
                });
            }}
          />
          <TextFormField
            disabled={loading}
            label="Spanish plural"
            value={state ? state.data.spanish_plural || "" : ""}
            onChange={(val) => {
              if (state)
                setState({
                  ...state,
                  data: { ...state.data, spanish_plural: val || "" },
                });
            }}
          />
        </FormRow>
        <FormRow>
          <NumberField
            label={
              state && state.data.class !== undefined
                ? `${BaseUnits[state.data.class][1]} per ${state.data.english}`
                : ""
            }
            value={
              state && state.data.base_per_unit !== undefined
                ? state.data.base_per_unit
                : null
            }
            onChange={(val) => {
              if (state)
                setState({
                  ...state,
                  data: { ...state.data, base_per_unit: val || 0 },
                });
            }}
          />
        </FormRow>
        <Box sx={{ display: "flex" }}>
          <Box>
            <CarefulButton
              disabled={loading}
              onClick={() => {
                if (state) {
                  const variables = { ...state };
                  variables.data.deleted = true;
                  setState(variables);
                  update({ variables });
                }
              }}
            >
              Delete
            </CarefulButton>
          </Box>
          <Box sx={{ flex: 1 }} />
          <LoadingButton
            onClick={() => {
              if (state) update({ variables: state });
            }}
            variant="contained"
            loading={loading}
          >
            Save
          </LoadingButton>
        </Box>
      </SideDrawer>
    </Box>
  );
};

export default UnitDetails;
