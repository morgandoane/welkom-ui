import { SignedUrlCategory } from "./../SignedUrl/SignedUrl";
import { Profile } from "../Profile/Profile";

export interface AppFile {
  id: string;
  name: string;
  created_by?: Profile | null;
  date_created: Date;
}
