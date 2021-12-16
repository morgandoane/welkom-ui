import { AppFile } from "./../AppFile/AppFile";
import { Contact } from "./../Contact/Contact";
import { Base } from "../Base/Base";
import { Location } from "../Location/Location";

export interface Company extends Base {
  name: string;
  locations: Location[];
  contacts: Contact[];
  files: AppFile[];
}

export interface TinyCompany {
  _id: string;
  name: string;
}
