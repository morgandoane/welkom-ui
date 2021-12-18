import {
  Box,
  ButtonBase,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ReactElement } from "react";
import { MdDelete } from "react-icons/md";
import { AppFile } from "../../../../graphql/schema/AppFile/AppFile";
import { truncate } from "../../../../utils/truncate";
import { getFileTypeCategory, iconMap } from "../../../FileUpload";

export interface FilePreviewProps {
  file: AppFile;
  deleteLoading: boolean;
  setPdf: (pdf: any) => void;
  handleDelete: (id: string) => void;
}

const getBlob = (url: string, callback: (fileBlob: Blob) => void) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.responseType = "blob";

  xhr.onload = function (e) {
    if (this.status == 200) {
      const blob = this.response;

      callback(blob);
    }
  };

  xhr.onerror = function (e) {
    alert("Failed to open file.");
  };

  xhr.send();
};

const FilePreview = (props: FilePreviewProps): ReactElement => {
  const { file, deleteLoading, setPdf, handleDelete } = props;
  const theme = useTheme();

  const openable = [".pdf", ".mp4", ".png", ".jpeg", ".jpg"];

  const [image, setImage] = React.useState<string | null>(null);

  const url = file.url.url;

  const onClick = () => {
    if (openable.some((o) => url.includes(o)))
      getBlob(url, (blob) => {
        if (url.includes(".pdf")) {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            const base64data = reader.result;
            setPdf(base64data);
          };
        } else {
          const blobUrl = URL.createObjectURL(blob);
          window.open(blobUrl, "_blank");
        }
      });
    else window.open(url);
  };

  React.useEffect(() => {
    const images = [".png", ".jpeg", ".jpg"];
    if (!image) {
      if (images.some((i) => file.name.includes(i))) {
        getBlob(url, (blob) => {
          const blobUrl = URL.createObjectURL(blob);
          setImage(blobUrl);
        });
      }
    }
  }, [file.name]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <ButtonBase
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",

          width: "100%",
          justifyContent: "flex-start",
          textAlign: "left",
        }}
      >
        <Box sx={{ display: "flex", fontSize: "2rem", padding: 2 }}>
          {image ? (
            <img style={{ maxHeight: 60 }} src={image} />
          ) : (
            iconMap[getFileTypeCategory(file ? file.name : "")]
          )}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography>{file ? file.name : ""}</Typography>
        </Box>
      </ButtonBase>
      <Box>
        <IconButton
          disabled={deleteLoading}
          onClick={(e) => {
            handleDelete(file.name);
          }}
        >
          <MdDelete />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FilePreview;
