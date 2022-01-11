import React, { ReactElement } from 'react';
import {
    BrowserRouter,
    Navigate,
    PathRouteProps,
    Route,
    Routes,
} from 'react-router-dom';
import {
    getUiPermissions,
    UiPermission,
    UiPermissions,
} from '../auth/UiPermission';
import usePermissions from '../auth/usePermissions';
import { UserRole } from '../auth/UserRole';
import Library from '../scenes/Library';
import Login from '../scenes/Login';
import Logistics from '../scenes/Logistics';
import Logout from '../scenes/Logout';
import NotFound from '../scenes/NotFound';
import People from '../scenes/People';
import Recipes from '../scenes/Recipes';
import ResetPassword from '../scenes/ResetPassword';
import Warehouse from '../scenes/Warehouse';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import ManagerRoute from './components/ManagerRoute';
import PermissionRoute from './components/PermissionRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

const routes: {
    props: PathRouteProps;
    auth:
        | { _type: 'permission'; permission: UiPermission }
        | { _type: 'role'; role: UserRole }
        | null;
}[] = [
    {
        auth: { _type: 'permission', permission: UiPermission.Library },
        props: {
            path: '/library/*',
            element: (
                <PermissionRoute permission={UiPermission.Library}>
                    <Library />
                </PermissionRoute>
            ),
        },
    },
    {
        auth: { _type: 'permission', permission: UiPermission.Logistics },
        props: {
            path: '/logistics/*',
            element: (
                <AuthenticatedRoute>
                    <Logistics />
                </AuthenticatedRoute>
            ),
        },
    },
    {
        auth: { _type: 'permission', permission: UiPermission.Recipes },
        props: {
            path: '/recipes/*',
            element: (
                <AuthenticatedRoute>
                    <Recipes />
                </AuthenticatedRoute>
            ),
        },
    },
    {
        auth: {
            _type: 'permission',
            permission: UiPermission.WarehouseOperator,
        },
        props: {
            path: '/warehouse/*',
            element: (
                <AuthenticatedRoute>
                    <Warehouse />
                </AuthenticatedRoute>
            ),
        },
    },
    {
        auth: { _type: 'role', role: UserRole.Manager },
        props: {
            path: '/people/*',
            element: (
                <ManagerRoute>
                    <People />
                </ManagerRoute>
            ),
        },
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

    if (!match) return { path: '/login' };
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
                    path="/resetpassword"
                    element={
                        <AuthenticatedRoute>
                            <ResetPassword />
                        </AuthenticatedRoute>
                    }
                />
                <Route
                    path="/passwordsuccess"
                    element={
                        <AuthenticatedRoute>
                            <ResetPassword success={true} />
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
