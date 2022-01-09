import { Box, Button, Tooltip, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdArrowUpward, MdArrowDownward, MdAdd } from 'react-icons/md';
import FormRow from '../../../../../../../../components/Forms/components/FormRow';
import QualityCheckField from '../../../../../../../../components/Forms/components/QualityCheckField';
import FulfillmentLotFinderForm from '../../../../../../../../components/Forms/FulfillmentLotFinderForm';
import { useQualityChecks } from '../../../../../../../../graphql/queries/qualityCheck/useQualityChecks';
import { FulfillmentItemInput } from '../../../../../../../../graphql/schema/Fulfillment/FulfillmentInput';
import { TinyItem } from '../../../../../../../../graphql/schema/Item/Item';

export interface FulfillmentItemProps {
    tiny_item: TinyItem;
    item: FulfillmentItemInput;
    setItem: (data: FulfillmentItemInput) => void;
    next: () => void;
    previous: () => void;
    drop: (index: number) => void;
    droppable: boolean;
    initiate: boolean;
}

const FulfillmentItemForm = (props: FulfillmentItemProps): ReactElement => {
    const {
        initiate,
        tiny_item,
        item,
        droppable,
        setItem,
        next,
        previous,
        drop,
    } = props;

    const getHoldup = (): string | null => {
        const errs = [];
        for (const lot of item.lots) {
            if (!lot.code) errs.push('Each lot needs a number.');
            if (!lot.company) errs.push('Each lot needs a company.');
            if (!lot.quantity) errs.push('Each lot needs a quantity.');
            if (!lot.unit) errs.push('Each lot needs a unit.');
        }
        if (errs[0]) return errs[0];
        for (const check of item.quality_check_responses) {
            if (!check.response)
                errs.push('Each quality check needs a response.');
        }
        if (errs[0]) return errs[0];
        return null;
    };

    const holdup = getHoldup();

    const { item: item_id, lots, quality_check_responses } = item;

    const { data } = useQualityChecks({
        variables: { filter: { skip: 0, take: 50, item: item_id } },
        onCompleted: ({ qualityChecks: { count, items } }) => {
            if (initiate) {
                const copy = { ...item };
                copy.quality_check_responses = items.map(({ _id }) => ({
                    qualityCheck: _id,
                    response: '',
                }));
                setItem(copy);
            }
        },
    });

    const checks = data ? data.qualityChecks.items : [];

    const gap = 3;

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6">{tiny_item.english}</Typography>
            <Box p={1} />
            <Box sx={{ maxWidth: 600 }}>
                <Typography variant="body2" color="textSecondary">
                    Lots
                </Typography>
                <Box p={0.5} />
                {lots.map((lot, lotIndex) => (
                    <FulfillmentLotFinderForm
                        droppable={droppable}
                        drop={() => drop(lotIndex)}
                        key={'lotForm_' + lotIndex + '_' + tiny_item._id}
                        value={lot}
                        onChange={(value) => {
                            const copy = { ...item };
                            copy.lots[lotIndex] = value;
                            setItem(copy);
                        }}
                    />
                ))}
                <Button
                    variant="text"
                    startIcon={<MdAdd />}
                    onClick={() => {
                        const copy = { ...item };
                        const lot = copy.lots[0];
                        copy.lots.push(
                            lot
                                ? {
                                      code: '',
                                      quantity: 0,
                                      unit: lot.unit,
                                      company: lot.company,
                                  }
                                : {
                                      code: '',
                                      quantity: 0,
                                      unit: '',
                                      company: '',
                                  }
                        );
                        setItem(copy);
                    }}
                >
                    Add lot
                </Button>
                <Box p={1} />
            </Box>
            {checks.length > 0 && (
                <Box sx={{ maxWidth: 300 }}>
                    <Typography variant="body2" color="textSecondary">
                        Quality Checks
                    </Typography>
                    <Box p={0.5} />
                    {quality_check_responses.map((check, checkIndex) => {
                        const qualityCheck = checks.find(
                            (c) => c._id === check.qualityCheck
                        );
                        if (qualityCheck)
                            return (
                                <FormRow gap={gap}>
                                    <QualityCheckField
                                        key={'check_' + checkIndex}
                                        check={qualityCheck}
                                        value={check.response}
                                        onChange={(val) => {
                                            const copy = { ...item };
                                            copy.quality_check_responses[
                                                checkIndex
                                            ].response = val;
                                            setItem(copy);
                                        }}
                                    />
                                </FormRow>
                            );
                    })}
                </Box>
            )}
            <Box p={1} />
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                    color="inherit"
                    variant="outlined"
                    endIcon={<MdArrowUpward />}
                    onClick={previous}
                >
                    Previous
                </Button>
                <Tooltip title={holdup || ''} arrow>
                    <Box>
                        <Button
                            disabled={Boolean(holdup)}
                            endIcon={<MdArrowDownward />}
                            onClick={next}
                        >
                            Next
                        </Button>
                    </Box>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default FulfillmentItemForm;
