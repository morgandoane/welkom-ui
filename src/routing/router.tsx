import React, { ReactElement } from 'react';
import {
    BrowserRouter,
    Navigate,
    PathRouteProps,
    Route,
    Routes,
} from 'react-router-dom';
import { getUiPermissions, UiPermission } from '../auth/UiPermission';
import usePermissions from '../auth/usePermissions';
import { UserRole } from '../auth/UserRole';
import Designs from '../scenes/Designs';
import Library from '../scenes/Library';
import Login from '../scenes/Login';
import Logout from '../scenes/Logout';
import NoPermissions from '../scenes/NoPermissions';
import NotFound from '../scenes/NotFound';
import People from '../scenes/People';
import SupplyChain from '../scenes/SupplyChain';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

const routes: {
    props: PathRouteProps;
    auth:
        | { _type: 'permission'; permission: UiPermission }
        | { _type: 'role'; role: UserRole }
        | null;
}[] = [
    {
        props: {
            path: 'library/*',
            element: <Library />,
        },
        auth: { _type: 'permission', permission: UiPermission.Library },
    },
    {
        props: {
            path: 'people/*',
            element: <People />,
        },
        auth: { _type: 'role', role: UserRole.Manager },
    },
    {
        props: {
            path: 'design/*',
            element: <Designs />,
        },
        auth: { _type: 'permission', permission: UiPermission.Design },
    },
    {
        props: {
            path: 'supplychain/*',
            element: <SupplyChain />,
        },
        auth: { _type: 'permission', permission: UiPermission.Library },
    },
];

export const useIndexRoute = (): { path: string } => {
    const { roles, permissions } = usePermissions();

    const uiPermissions = getUiPermissions(permissions);

    const match = routes.find((route) => {
        if (roles.includes(UserRole.Admin)) return true;
        else if (roles.includes(UserRole.Manager))
            return (
                !route.auth ||
                route.auth._type == 'permission' ||
                route.auth.role == UserRole.Manager ||
                route.auth.role == UserRole.User
            );
        else {
            return (
                !route.auth ||
                (route.auth._type == 'permission' &&
                    uiPermissions
                        .map((p) => p.name)
                        .includes(route.auth.permission))
            );
        }
    });

    if (!match) return { path: '/nopermissions' };
    else return { path: match.props.path.replace('*', '') };
};

export const Router = (): ReactElement => {
    const { path } = useIndexRoute();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={path} />} />
                <Route
                    path="/login"
                    element={
                        <UnauthenticatedRoute>
                            <Login />
                        </UnauthenticatedRoute>
                    }
                />
                <Route />
                {routes.map(({ props: rProps, auth }) => (
                    <Route {...rProps} key={'route' + rProps.path} />
                ))}
                <Route
                    path="/nopermissions"
                    element={
                        <AuthenticatedRoute>
                            <NoPermissions />
                        </AuthenticatedRoute>
                    }
                />
                <Route
                    path="/logout"
                    element={
                        <AuthenticatedRoute>
                            <Logout />
                        </AuthenticatedRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
