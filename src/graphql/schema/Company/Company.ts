import { TinyProfile } from './../Profile/Profile';
import { AppFile } from './../AppFile/AppFile';
import { Contact, TinyContact } from './../Contact/Contact';
import { Base } from '../Base/Base';
import { Location } from '../Location/Location';

export interface Company extends Base {
    name: string;
    locations: Location[];
    contacts: Contact[];
    files: AppFile[];
}

export interface TinyCompany {
    _id: string;
    name: string;
    created_by: TinyProfile;
    modified_by?: TinyProfile | null;
    date_created: Date;
    date_modified?: Date | null;
    contacts: TinyContact[];
}
