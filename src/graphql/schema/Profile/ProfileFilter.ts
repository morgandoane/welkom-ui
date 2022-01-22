import { Permission } from './../../../auth/Permission';
import { PaginateArg } from '../Pagination/Pagination';

export interface ProfileFilter extends PaginateArg {
    name?: string;
    has_permissions?: Permission[];
    skip_sync?: boolean;
}
