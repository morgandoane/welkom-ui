import { ProfilePreview } from "./ProfilePreview";

export interface Base {
  __typename: "Base";
  _id: string;
  date_created: Date;
  created_by: ProfilePreview;
  date_modified?: Date | null;
  modified_by?: ProfilePreview | null;
  deleted: boolean;
}
