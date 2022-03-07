import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DesignForm } from '../../components/Inputs/Form';
import { DesignLocation } from '../../graphql/inputsTypes';
import DesignDetail from './components/DesignDetail';
import DesignList from './components/DesignList';

const Designs = (): ReactElement => {
    return (
        <Routes>
            <Route
                index
                element={<Navigate to={'list/' + DesignLocation.Draper} />}
            />
            <Route path="list/:location/*" element={<DesignList />} />
            <Route path="list/:location/:category*" element={<DesignList />} />
            <Route path="detail/*" element={<DesignDetail />} />
            <Route path="detail/:id/*" element={<DesignDetail />} />
            <Route path="detail/:id/edit" element={<DesignForm />} />
            <Route
                path="list/:location/:category/new"
                element={<DesignForm />}
            />
            <Route
                path="list/:location/:category/:parent/new"
                element={<DesignForm />}
            />
        </Routes>
    );
};

export default Designs;
