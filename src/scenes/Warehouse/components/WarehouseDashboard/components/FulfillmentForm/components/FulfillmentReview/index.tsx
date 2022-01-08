import { Box, Typography, useTheme } from "@mui/material";
import React, { ReactElement } from "react";
import FormRow from "../../../../../../../../components/Forms/components/FormRow";
import { useQualityChecks } from "../../../../../../../../graphql/queries/qualityCheck/useQualityChecks";
import { useTinyUnits } from "../../../../../../../../graphql/queries/units/useTinyUnits";
import { Bol } from "../../../../../../../../graphql/schema/Bol/Bol";
import {
  CreateFulfillmentInput,
  FulfillmentItemInput,
  UpdateFulfillmentInput,
} from "../../../../../../../../graphql/schema/Fulfillment/FulfillmentInput";
import { QualityCheck } from "../../../../../../../../graphql/schema/QualityCheck/QualityCheck";

export interface FulfillmentReviewProps {
  value: CreateFulfillmentInput | UpdateFulfillmentInput;
  bol: Bol | null;
}

const FulfillmentItemReview = (props: {
  item: FulfillmentItemInput;
  bol: Bol | null;
}): ReactElement | null => {
  const {
    item: { item, quality_check_responses, lots },
    bol,
  } = props;

  const { data: unitData } = useTinyUnits({
    variables: {
      filter: {
        skip: 0,
        take: 100,
      },
    },
  });

  const units = unitData ? unitData.units.items : [];

  const { data } = useQualityChecks({
    variables: { filter: { skip: 0, take: 50, item } },
  });
  const contents = bol ? bol.contents : [];
  const content = contents.find((c) => c.item._id === item);

  const qualityChecks = data ? data.qualityChecks.items : [];

  if (content)
    return (
      <Box>
        <Typography variant="caption" color="textSecondary">
          {content.item.english} details
        </Typography>
        {lots.map((lot, lotIndex) => (
          <Typography key={"lot_" + lotIndex}>
            {`Lot # ${lot.code} - ${lot.quantity} ${
              units.find((u) => u._id === lot.unit)?.english_plural
            }`}
          </Typography>
        ))}
        {quality_check_responses.length > 0 && (
          <Box sx={{ paddingLeft: 3, paddingTop: 2 }}>
            <Typography variant="caption" color="textSecondary">
              {`${content.item.english} quality checks`}
            </Typography>
            {quality_check_responses.map((response, responseIndex) => {
              const check = qualityChecks.find(
                (c) => c._id === response.qualityCheck
              );
              if (check)
                return (
                  <Box key={"response_" + responseIndex}>
                    <Typography variant="body2" color="textSecondary">
                      {check.prompt.phrase}
                    </Typography>
                    <Typography>{response.response}</Typography>
                  </Box>
                );
            })}
          </Box>
        )}
      </Box>
    );
  else return null;
};

const FulfillmentReview = (props: FulfillmentReviewProps): ReactElement => {
  const {
    value: { bol_code_override, items },
    bol,
  } = props;

  const { palette } = useTheme();

  return (
    <Box
      sx={{
        paddingBottom: 4,
        flexFlow: "column",
        gap: 2,
        background: palette.background.paper,
        display: "inline-block",
        padding: 2,
        minWidth: 400,
        marginBottom: 2,
      }}
    >
      <Typography variant="h6">Review</Typography>
      <Box p={0.5} />
      <Box>
        {bol_code_override && (
          <Box>
            <Typography variant="caption" color="textSecondary">
              BOL number
            </Typography>
            <Typography>{bol_code_override}</Typography>
          </Box>
        )}
      </Box>
      <Box>
        {items.map((item, itemIndex) => (
          <FulfillmentItemReview
            key={"itemReview_" + itemIndex}
            bol={bol}
            item={item}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FulfillmentReview;
