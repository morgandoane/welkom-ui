import { LoadingButton } from "@mui/lab";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import AppFab from "../../../../../../../../components/AppFab";
import CarefulButton from "../../../../../../../../components/Forms/CarefulButton";
import FormRow from "../../../../../../../../components/Forms/components/FormRow";
import NumberField from "../../../../../../../../components/Forms/components/NumberField";
import UnitClassField from "../../../../../../../../components/Forms/components/UnitClassField";
import PanelHeader from "../../../../../../../../components/PanelComponents/PanelHeader";
import SideDrawer from "../../../../../../../../components/SideDrawer";
import {
  DeleteConversionArgs,
  DeleteConversionRes,
  useConversionDeletion,
} from "../../../../../../../../graphql/mutations/conversion/delete/useConversionDeletion";
import {
  UpsertConversionArgs,
  UpsertConversionRes,
  useConversionUpsert,
} from "../../../../../../../../graphql/mutations/conversion/upsert/useConversionUpsert";
import { ItemQuery } from "../../../../../../../../graphql/queries/items/useItem";
import { Item } from "../../../../../../../../graphql/schema/Item/Item";
import { UnitClass } from "../../../../../../../../graphql/schema/Unit/Unit";
import { OperationResult } from "../../../../../../../../graphql/types";
import { BaseUnits } from "../../../../../Units/components/UnitView/components/UnitDetails";

export interface ItemConversionsProps {
  item: Item;
}

type State =
  | ({ _type: "delete" } & DeleteConversionArgs)
  | ({ _type: "upsert" } & UpsertConversionArgs);

const ItemConversions = (props: ItemConversionsProps): ReactElement => {
  const { item } = props;

  const [result, setResult] = React.useState<OperationResult<
    UpsertConversionRes | DeleteConversionRes
  > | null>(null);

  const [state, setState] = React.useState<(State & { _id?: string }) | null>(
    null
  );

  const [removeConversion, { loading: deleteLoading }] = useConversionDeletion({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    refetchQueries: [ItemQuery],
  });

  const [upsert, { loading: upsertLoading }] = useConversionUpsert({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    refetchQueries: [ItemQuery],
  });

  const submit = (remove?: true) => {
    if (state) {
      if (remove && state._id) {
        removeConversion({
          variables: {
            id: state._id,
          },
        });
      } else if (state._type == "upsert") {
        const { _id, _type, ...rest } = state;
        upsert({ variables: { ...rest } });
      }
    }
  };

  const onClose = () => {
    setState(null);
    setResult(null);
  };

  const loading = deleteLoading || upsertLoading;

  return (
    <Box sx={{ paddingTop: 2 }}>
      <List disablePadding>
        {item.conversions.map((conversion) => (
          <ListItem
            onClick={() => {
              setState({
                _type: "upsert",
                item: item._id,
                data: {
                  from: conversion.from,
                  to: conversion.to,
                  from_per_to: conversion.from_per_to,
                },
              });
            }}
            button
            divider
            key={"listItem_" + conversion._id}
          >
            <ListItemText>
              {`1 ${BaseUnits[conversion.to][0]} of ${
                item.english
              } is equivelant to ${conversion.from_per_to} ${
                BaseUnits[conversion.from][conversion.from_per_to == 1 ? 0 : 1]
              }`}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <SideDrawer
        error={result && result.success == false ? result.error : undefined}
        loading={loading}
        open={Boolean(state)}
        onClose={onClose}
        success={
          result && result.success == true
            ? "Unit conversion saved!"
            : undefined
        }
        onSuccess={() => onClose()}
      >
        <PanelHeader>Unit conversion</PanelHeader>
        <FormRow>
          <Typography sx={{ maxWidth: 300 }}>
            {`${item.english} is measured in ${
              BaseUnits[item.unit_class][1]
            }. To use ${
              item.english
            } in another unit, a conversion will be required.`}
          </Typography>
        </FormRow>
        <FormRow>
          <UnitClassField
            exclude={item.unit_class}
            label={`Convert ${item.english} in ${
              BaseUnits[item.unit_class][1]
            } to`}
            value={
              state && state._type == "upsert"
                ? state.data.to
                : UnitClass.Weight
            }
            onChange={(to) => {
              if (state && state._type == "upsert") {
                setState({ ...state, data: { ...state.data, to } });
              }
            }}
          />
        </FormRow>
        <FormRow>
          <NumberField
            label={
              state && state._type == "upsert"
                ? `How many ${BaseUnits[state.data.from][1]} are in a ${
                    BaseUnits[state.data.to][0]
                  } of ${item.english}`
                : "Units per Unit"
            }
            value={
              state && state._type == "upsert" ? state.data.from_per_to : 0
            }
            onChange={(val) => {
              if (state && state._type == "upsert") {
                setState({
                  ...state,
                  data: { ...state.data, from_per_to: val == null ? 0 : val },
                });
              }
            }}
          />
        </FormRow>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Box>
            <CarefulButton onClick={() => submit(true)}>
              Delete conversion
            </CarefulButton>
          </Box>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={() => submit()}
          >
            Save
          </LoadingButton>
        </Box>
      </SideDrawer>
      <AppFab
        onClick={() => {
          setState({
            _type: "upsert",
            item: item._id,
            data: {
              from: item.unit_class,
              to: Object.keys(UnitClass).find(
                (c) => (c as UnitClass) !== item.unit_class
              ) as UnitClass,
              from_per_to: 1,
            },
          });
        }}
      >
        New conversion
      </AppFab>
    </Box>
  );
};

export default ItemConversions;
