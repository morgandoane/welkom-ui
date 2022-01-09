import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import usePermissions from '../../../../auth/usePermissions';
import { UserRole } from '../../../../auth/UserRole';
import ListSelect from '../../../ListSelect';

export interface RoleFieldProps {
    value: UserRole;
    onChange: (value: UserRole | null) => void;
}

export const userRoleDescriptions: Record<UserRole, string> = {
    [UserRole.Admin]: 'Full access to sensitive backend controls.',
    [UserRole.Manager]: 'LDB Management role.',
    [UserRole.User]: 'Basic app user. Permissions based on team assignments.',
};

const RoleField = (props: RoleFieldProps): ReactElement => {
    const { value, onChange } = props;

    const { roles, permissions } = usePermissions();

    const options = Object.keys(UserRole).map((role) => ({
        name: role,
        description: userRoleDescriptions[role as UserRole],
    }));

    const filtered = roles.includes(UserRole.Admin)
        ? options
        : options.filter((o) => o.name === UserRole.User);

    return (
        <ListSelect
            label="User role"
            multiple={false}
            options={filtered}
            value={options.find((o) => o.name === value) || null}
            textProps={(val) => ({
                primary: val.name,
                secondary: val.description,
            })}
            onChange={(val) => {
                onChange(val ? (val.name as UserRole) : null);
            }}
        />
    );
};

export default RoleField;
