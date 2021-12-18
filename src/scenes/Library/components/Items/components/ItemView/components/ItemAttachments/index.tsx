import { Box } from "@mui/material";
import React, { ReactElement } from "react";
import { Item } from "../../../../../../../../graphql/schema/Item/Item";
import FileUpload from "../../../../../../../../components/FileUpload";
import { useUploads } from "../../../../../../../../providers/UploadProvider";
import Files from "../../../../../../../../components/Files";
import { StorageBucket } from "../../../../../../../../graphql/schema/SignedUrl/SignedUrl";
import { ItemQuery } from "../../../../../../../../graphql/queries/items/useItem";

export interface ItemDocumentsProps {
  item: Item;
  refetch: () => void;
}

const ItemAttachments = (props: ItemDocumentsProps): ReactElement => {
  const { item, refetch } = props;
  const { enqueue } = useUploads(props.refetch);

  return (
    <Box sx={{ height: "90%", overflow: "auto" }}>
      <Files
        files={item.files}
        prefix={item._id}
        storage_category={StorageBucket.Attachments}
        refetchQueries={[ItemQuery, "ItemQuery"]}
      />
      <FileUpload
        fab
        onChange={(files) =>
          enqueue(
            files.map((file) => ({
              file,
              prefix: item._id,
              storage_category: StorageBucket.Attachments,
            }))
          )
        }
      />
    </Box>
  );
};

export default ItemAttachments;
