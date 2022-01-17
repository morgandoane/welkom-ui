import { TinyProfile } from './../Profile/Profile';
import { Profile } from '../Profile/Profile';

export interface Base {
    _id: string;
    date_created: Date;
    date_modified?: Date | null;
    created_by: TinyProfile;
    modified_by?: TinyProfile | null;
    deleted: boolean;
}
