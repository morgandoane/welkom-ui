import { BaseFilter } from '../Base/BaseFilter';

export interface CompanyFilter extends BaseFilter {
    name?: string;
    mine?: boolean;
}
