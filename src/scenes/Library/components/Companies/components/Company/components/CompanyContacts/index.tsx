import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Badge,
    Typography,
    Tooltip,
} from '@mui/material';
import React, { ReactElement } from 'react';
import AppFab from '../../../../../../../../components/Inputs/AppFab';
import { Company } from '../../../../../../../../graphql/schema/Company/Company';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../../../components/feedback/Message';

export interface CompanyContactsProps {
    company: Company;
}

const CompanyContacts = (props: CompanyContactsProps): ReactElement => {
    const { company } = props;

    const nav = useNavigate();

    return (
        <Box sx={{ height: '100%' }}>
            {company.contacts.length == 0 && (
                <Message type="No Data" message="No contacts yet" />
            )}
            <List>
                {company.contacts.map((contact) => (
                    <ListItem key={contact._id}>
                        <ListItemAvatar>
                            <Avatar>
                                {contact.name.split(' ').length == 2
                                    ? `${contact.name.split(' ')[0][0]}${
                                          contact.name.split(' ')[1][0]
                                      }`
                                    : contact.name}
                            </Avatar>
                        </ListItemAvatar>

                        <Badge
                            badgeContent={
                                <Tooltip
                                    arrow
                                    title={
                                        contact.email_on_order
                                            ? 'Email on orders'
                                            : contact.cc_on_order
                                            ? 'CC on orders'
                                            : ''
                                    }
                                >
                                    <Typography variant="body2">
                                        {contact.email_on_order
                                            ? 'Email'
                                            : contact.cc_on_order
                                            ? 'CC'
                                            : ''}
                                    </Typography>
                                </Tooltip>
                            }
                            color={
                                contact.email_on_order
                                    ? 'primary'
                                    : contact.cc_on_order
                                    ? 'secondary'
                                    : undefined
                            }
                        >
                            <ListItemText
                                primary={contact.name}
                                secondary={contact.email}
                            />
                        </Badge>
                    </ListItem>
                ))}
            </List>
            <AppFab onClick={() => nav('edit')} icon={<MdEdit />} absolute>
                Update contacts
            </AppFab>
        </Box>
    );
};

export default CompanyContacts;
