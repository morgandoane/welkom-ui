import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ItemType } from '../../../../graphql/schema/Item/Item';
import ItemsView from './components/ItemsView';
import ItemView from './components/ItemView';

const Items = (props: { type: ItemType | null }): ReactElement => {
    return (
        <Routes>
            <Route index element={<ItemsView type={props.type} />} />
            <Route path="/" element={<ItemsView type={props.type} />} />
            <Route path=":id" element={<ItemView type={props.type} />} />
        </Routes>
    );
};

export default Items;
