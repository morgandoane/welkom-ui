import { Box, IconButton, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { ReactElement } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Verification } from "../../graphql/schema/Verification/Verification";
import { dateFormats } from "../../utils/dateFormats";
import { VerificationIcon } from "../Forms/VerificationForm";

export interface VerificationPreviewProps {
  verification: Verification;
  onDelete?: () => void;
  onEdit?: () => void;
}

const VerificationPreview = (props: VerificationPreviewProps): ReactElement => {
  const { verification, onDelete, onEdit } = props;

  return (
    <Box
      sx={{ display: "flex", flexFlow: "row", gap: 2, alignItems: "center" }}
    >
      <Box sx={{ fontSize: "2rem", display: "flex" }}>
        <VerificationIcon status={verification.status} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">{verification.status}</Typography>
        <Typography variant="body2" color="textSecondary">
          {verification.notes}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {verification.created_by.name +
            " - " +
            format(
              new Date(verification.date_modified || verification.date_created),
              dateFormats.condensedDate
            )}
        </Typography>
      </Box>
      {onEdit && (
        <Box>
          <IconButton onClick={onEdit}>
            <MdEdit />
          </IconButton>
        </Box>
      )}
      {onDelete && (
        <Box>
          <IconButton onClick={onDelete}>
            <MdDelete />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default VerificationPreview;
