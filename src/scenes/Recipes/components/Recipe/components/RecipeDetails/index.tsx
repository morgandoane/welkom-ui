import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdCalendarToday } from 'react-icons/md';
import { Recipe } from '../../../../../../graphql/schema/Recipe/Recipe';
import { dateFormats } from '../../../../../../utils/dateFormats';

export interface RecipeDetailsProps {
    recipe: Recipe;
}

const RecipeDetails = (props: RecipeDetailsProps): ReactElement => {
    const { recipe } = props;

    const { palette } = useTheme();

    return (
        <Box sx={{ paddingTop: 1, maxWidth: 400 }}>
            <List>
                <ListItem divider>
                    <ListItemAvatar>
                        <Avatar
                            src={recipe.created_by.picture}
                            alt={recipe.created_by.name}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={recipe.created_by.name}
                        secondary="Created by"
                    />
                </ListItem>
                <ListItem divider>
                    <ListItemAvatar>
                        <MdCalendarToday
                            style={{
                                fontSize: '2.5rem',
                                color: palette.text.disabled,
                            }}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {format(
                                    new Date(recipe.date_created),
                                    dateFormats.condensedDate +
                                        ' ' +
                                        dateFormats.time
                                )}
                            </Box>
                        }
                        secondary="Date created"
                    />
                </ListItem>
                {recipe.active && (
                    <Box>
                        <ListItem divider>
                            <ListItemAvatar>
                                <Avatar
                                    src={recipe.active.created_by.picture}
                                    alt={recipe.active.created_by.name}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={recipe.active.created_by.name}
                                secondary="Last version by"
                            />
                        </ListItem>
                        <ListItem divider>
                            <ListItemAvatar>
                                <MdCalendarToday
                                    style={{
                                        fontSize: '2.5rem',
                                        color: palette.text.disabled,
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {format(
                                            new Date(
                                                recipe.active.date_created
                                            ),
                                            dateFormats.condensedDate +
                                                ' ' +
                                                dateFormats.time
                                        )}
                                    </Box>
                                }
                                secondary="Last version date"
                            />
                        </ListItem>
                    </Box>
                )}
            </List>
        </Box>
    );
};

export default RecipeDetails;
