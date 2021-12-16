import { Profile } from "../Profile/Profile";

export interface Base {
  _id: string;
  date_created: Date;
  date_modified?: Date | null;
  created_by: Profile;
  modified_by?: Profile | null;
  deleted: boolean;
}
