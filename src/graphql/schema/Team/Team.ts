import { TinyLocation } from "./../../queries/locations/useTinyLocations";
import { TinyProfile } from "./../Profile/Profile";
import { TinyCompany } from "./../Company/Company";
import { Permission } from "../../../auth/Permission";
import { Base } from "../Base/Base";

export interface Team extends Base {
  name: string;
  description?: string | null;
  company: TinyCompany;
  members: TinyProfile[];
  location?: TinyLocation | null;
  permissions: Permission[];
}
