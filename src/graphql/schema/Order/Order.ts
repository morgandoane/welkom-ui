import { Base, TinyBase } from '../Base/Base';
import { TinyCompany } from '../Company/Company';
import { OrderLine } from './OrderLine';

export interface Order extends Base {
    code: string;
    customer: TinyCompany | null;
    vendor: TinyCompany | null;
    lines: OrderLine[];
}

export interface TinyOrder extends TinyBase {
    code: string;
    customer: TinyCompany | null;
    vendor: TinyCompany | null;
    lines: OrderLine[];
}
