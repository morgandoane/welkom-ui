import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../../../../../../../graphql/schema/Company/Company';
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material';
import { MdAdd, MdEdit, MdLocationPin } from 'react-icons/md';
import AppFab from '../../../../../../../../components/Inputs/AppFab';
import { useLocations } from '../../../../../../../../graphql/schema/Location/useLocations';
import Message from '../../../../../../../../components/feedback/Message';

export interface CompanyLocationsProps {
    company: Company;
}

const CompanyLocations = (props: CompanyLocationsProps): ReactElement => {
    const { company } = props;

    const nav = useNavigate();

    const { data } = useLocations({
        variables: {
            filter: {
                skip: 0,
                take: 25,
                company: company._id,
            },
        },
        fetchPolicy: 'network-only',
    });

    const locations = data ? data.locations.items : [];

    return (
        <Box sx={{ height: '95%' }}>
            {locations.length == 0 && data && (
                <Message type="No Data" message="No locations yet" />
            )}
            <List>
                {locations.map((location) => (
                    <ListItem divider key={location._id}>
                        <ListItemAvatar>
                            <MdLocationPin style={{ fontSize: '32px' }} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={location.label}
                            secondary={
                                location.address
                                    ? `${location.address.city}, ${location.address.state}`
                                    : undefined
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => nav(`${location._id}/edit`)}
                            >
                                <MdEdit />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <AppFab
                onClick={() => nav('newlocation')}
                icon={<MdAdd />}
                absolute
            >
                Add location
            </AppFab>
        </Box>
    );
};

export default CompanyLocations;
