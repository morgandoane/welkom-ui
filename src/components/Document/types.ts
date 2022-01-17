import { TinyItem } from '../../graphql/schema/Item/Item';
import { TinyProfile } from '../../graphql/schema/Profile/Profile';

export interface LotDocument {
    _type: 'lot';
    date_created: Date;
    created_by: TinyProfile;
    code: string;
    item: TinyItem;
    bol_id: string;
    fulfillment_id: string;
}

export interface BolDocument {
    _type: 'bol';
    date_created: Date;
    created_by: TinyProfile;
    code: string;
}
