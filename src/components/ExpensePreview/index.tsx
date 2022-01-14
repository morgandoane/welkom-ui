import { Box, Button, Collapse, Typography, useTheme } from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdChevronRight, MdEdit, MdExpandMore } from 'react-icons/md';
import { Expense } from '../../graphql/schema/Expense/Expense';
import { commafy } from '../../utils/commafy';
import { dateFormats } from '../../utils/dateFormats';
import Anima from '../Anima';
import Details from '../Details';

export interface ExpensePreviewProps {
    expenses: Expense[];
    onClick: (expense: Expense) => void;
}

const ExpensePreview = (props: ExpensePreviewProps): ReactElement => {
    const { expenses, onClick } = props;

    const { palette, shape } = useTheme();

    const [expanded, setExpanded] = React.useState<number[]>([]);

    return (
        <Box sx={{ display: 'flex', flexFlow: 'column', gap: 2 }}>
            {expenses.map((expense, index) => (
                <Box
                    sx={{ ...shape, border: `1px solid ${palette.divider}` }}
                    key={'expense_' + index}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant="body1">
                            ${commafy(expense.amount)}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                            }}
                        >
                            <Typography variant="caption" color="textSecondary">
                                {expense.customer.name}
                            </Typography>
                            <MdChevronRight />
                            <Typography variant="caption" color="textSecondary">
                                {expense.vendor.name}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            background: palette.background.paper,
                            padding: 1,
                        }}
                    >
                        <Collapse in={expanded.includes(index)}>
                            <Box sx={{ p: 1, paddingBottom: 0 }}>
                                <Details>
                                    {[
                                        {
                                            key: 'Created by',
                                            value: expense.created_by.name,
                                        },
                                        {
                                            key: 'Date created',
                                            value: format(
                                                new Date(expense.date_created),
                                                dateFormats.condensedDate
                                            ),
                                        },
                                    ]}
                                </Details>
                            </Box>
                        </Collapse>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    if (expanded.includes(index)) {
                                        setExpanded(
                                            expanded.filter((e) => e !== index)
                                        );
                                    } else {
                                        setExpanded([...expanded, index]);
                                    }
                                }}
                                variant="text"
                                endIcon={
                                    <Anima
                                        type="rotate"
                                        in={expanded.includes(index)}
                                    >
                                        <Box sx={{ display: 'flex' }}>
                                            <MdExpandMore />
                                        </Box>
                                    </Anima>
                                }
                            >
                                Details
                            </Button>
                            <Button
                                endIcon={<MdEdit />}
                                size="small"
                                variant="text"
                                onClick={() => onClick(expense)}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default ExpensePreview;
