import { DocumentNode } from '@apollo/client';
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdCalendarToday, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Base } from '../../../../graphql/schema/Base/Base';
import { UploadEnabled } from '../../../../graphql/schema/UploadEnabled/UploadEnabled';
import { dateFormats } from '../../../../utils/dateFormats';
import AppFab from '../../../Inputs/AppFab';
import ProfilePhoto from '../../../Inputs/ProfilePhoto';

export interface DetailsTabProps<T extends Base | UploadEnabled> {
    data: T;
    entity: string;
    refetchQueries?: DocumentNode[];
}

const DetailsTab = <T extends Base | UploadEnabled>(
    props: DetailsTabProps<T>
): ReactElement => {
    const { data, entity, refetchQueries = [] } = props;

    const nav = useNavigate();

    return (
        <Box>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar
                            src={data.created_by.picture}
                            alt={
                                data.created_by.given_name &&
                                data.created_by.family_name
                                    ? `${data.created_by.given_name[0]}${data.created_by.family_name[0]}`
                                    : data.created_by.name
                            }
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            data.created_by.given_name &&
                            data.created_by.family_name
                                ? `${data.created_by.given_name} ${data.created_by.family_name}`
                                : data.created_by.name
                        }
                        secondary="Created by"
                    />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <MdCalendarToday style={{ fontSize: '40px' }} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={format(
                            new Date(data.date_created),
                            dateFormats.condensedDate + ' - ' + dateFormats.time
                        )}
                        secondary="Date created"
                    />
                </ListItem>
            </List>
            {'photo' in data && (
                <ProfilePhoto refetchQueries={refetchQueries}>
                    {data}
                </ProfilePhoto>
            )}
            <AppFab onClick={() => nav('edit')} icon={<MdEdit />} absolute>
                {`Edit ${entity}`}
            </AppFab>
        </Box>
    );
};

export default DetailsTab;
