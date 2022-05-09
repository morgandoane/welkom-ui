import { Permission } from '../../../../auth/Permission';
import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';

export interface UpdateTeamInput extends UpdateBaseInput {
    name?: string;
    permissions?: Permission[];
    members?: string[];
}
