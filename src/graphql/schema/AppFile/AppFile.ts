import { TinyProfile } from './../Profile/Profile';

export interface AppFile {
    url: string;
    name: string;
    display_name: string;
    date_created: Date;
    created_by: TinyProfile;
}
