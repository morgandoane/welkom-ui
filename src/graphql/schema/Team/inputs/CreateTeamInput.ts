import { Permission } from '../../../../auth/Permission';
import { Ref } from '../../../types';
import { Company } from '../../Company/Company';

export interface CreateTeamInput {
    name: string;
    company: Ref<Company>;
    permissions: Permission[];
    members: string[];
}
