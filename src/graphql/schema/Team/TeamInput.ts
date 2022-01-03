import { Permission } from "../../../auth/Permission";

export interface CreateTeamInput {
  name: string;
  description?: string;
  company: string;
  members: string[];
  location?: string;
  permissions: Permission[];
}

export interface UpdateTeamInput {
  deleted?: boolean;
  name?: string;
  description?: string;
  company?: string;
  members?: string[];
  location?: string;
  permissions?: Permission[];
}
