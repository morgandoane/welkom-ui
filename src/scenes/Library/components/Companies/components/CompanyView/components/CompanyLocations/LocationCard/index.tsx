import { IconButton, Typography, Box, useTheme } from "@mui/material";
import React, { ReactElement } from "react";
import { MdEdit } from "react-icons/md";
import { Location } from "../../../../../../../../../graphql/schema/Location/Location";

export interface LocationCardProps {
  index: number;
  location: Location;
  edit: () => void;
}

const LocationCard = (props: LocationCardProps): ReactElement => {
  const theme = useTheme();
  const { index, location, edit } = props;

  const label = location.label
    ? location.label
    : location.address
    ? location.address.city
    : "Location " + index;

  const { address } = location;

  return (
    <Box
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        paddingBottom: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{label}</Typography>
        <IconButton onClick={edit}>
          <MdEdit />
        </IconButton>
      </Box>
      {address && (
        <Box>
          <Typography variant="body2" color="textSecondary">
            {address.line_1}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {address.line_2}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >{`${address.city}, ${address.state} ${address.postal}`}</Typography>
          <Typography variant="body2" color="textSecondary">
            {address.country}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LocationCard;
