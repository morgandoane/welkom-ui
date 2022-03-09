import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TeamForm } from '../../../../components/Inputs/Form';
import TeamDetail from './components/TeamDetail';
import TeamsList from './components/TeamsList';

const Teams = (): ReactElement => {
    return (
        <Routes>
            <Route index element={<TeamsList />} />
            <Route path=":id" element={<TeamDetail />} />
            <Route path=":id/edit" element={<TeamForm />} />
            <Route path="new" element={<TeamForm />} />
        </Routes>
    );
};

export default Teams;
