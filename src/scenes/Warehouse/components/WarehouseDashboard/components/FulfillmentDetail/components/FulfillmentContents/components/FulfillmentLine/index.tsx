import {
    Box,
    Button,
    Collapse,
    Divider,
    Grow,
    IconButton,
    Popover,
    Typography,
    useTheme,
} from '@mui/material';
import { id } from 'date-fns/locale';
import React, { ReactElement } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { MdCheckCircle, MdExpandMore } from 'react-icons/md';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import Anima from '../../../../../../../../../../components/Anima';
import { BolItemContent } from '../../../../../../../../../../graphql/schema/Content/Content';
import {
    Fulfillment,
    FulfillmentType,
} from '../../../../../../../../../../graphql/schema/Fulfillment/Fulfillment';
import { UnitClass } from '../../../../../../../../../../graphql/schema/Unit/Unit';
import { useClickState } from '../../../../../../../../../../hooks/useClickState';
import { percentage } from '../../../../../../../../../../utils/percentage';

export interface FulfillmentLineProps {
    fulfillment: Fulfillment;
    content: BolItemContent;
}

const FulfillmentLine = (props: FulfillmentLineProps): ReactElement => {
    const { fulfillment, content } = props;

    const { palette, shape } = useTheme();

    const [showBreakdown, setShowBreakdown] = React.useState(false);

    const [clickState, setClickState] = useClickState();

    const expected = content.quantity;
    const expectedUnit = content.unit;

    const applicableLots = fulfillment.lots.filter(
        (l) => l.item._id === content.item._id
    );

    const subLots = applicableLots.map((l) => l.contents).flat();

    const qtys = subLots.reduce((acc, item) => {
        const copy = { ...acc };
        if (copy[item.unit.class]) {
            copy[item.unit.class] =
                (copy[item.unit.class] || 0) +
                item.quantity * item.unit.base_per_unit;
        } else {
            copy[item.unit.class] = item.quantity * item.unit.base_per_unit;
        }
        return copy;
    }, {} as Partial<Record<UnitClass, number>>);

    const data =
        Object.keys(qtys).length == 1
            ? [
                  {
                      label: 'Received',
                      value: Object.values(qtys)[0],
                      color: palette.success.main,
                  },
                  {
                      label: 'Missing',
                      value:
                          expected * expectedUnit.base_per_unit -
                          Object.values(qtys)[0],
                      color: palette.warning.main,
                  },
              ]
            : [];

    const percentageTag =
        Object.values(qtys).length !== 1
            ? null
            : Math.ceil(
                  (Object.values(qtys)[0] /
                      (content.quantity * content.unit.base_per_unit)) *
                      100
              ) + '%';

    const thisLot = fulfillment.lots.find(
        (l) => l.item._id === content.item._id
    );

    const responses = thisLot ? thisLot.quality_check_responses : [];
    const passed = responses.filter((r) => r.passed);
    const failed = responses.filter((r) => !r.passed);

    return (
        <Box
            sx={{
                ...shape,
                border: `1px solid ${palette.divider}`,
                display: 'inline-block',
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">{content.item.english}</Typography>
                <Box
                    sx={{ display: 'flex', gap: 4, justifyContent: 'stretch' }}
                >
                    <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                        <Box p={1} />
                        <Typography variant="caption" color="textSecondary">
                            {`Expected to ${
                                fulfillment.type == FulfillmentType.Receipt
                                    ? 'receive'
                                    : 'ship'
                            }`}
                        </Typography>
                        <Typography>{`${
                            content.quantity * content.unit.base_per_unit
                        } ${
                            content.unit.class == UnitClass.Count
                                ? 'Eaches'
                                : content.unit.class == UnitClass.Time
                                ? 'Minutes'
                                : content.unit.class == UnitClass.Volume
                                ? 'Volume'
                                : content.unit.class == UnitClass.Weight
                                ? 'Pounds'
                                : ''
                        }`}</Typography>
                        <Box p={1} />
                        <Typography variant="caption" color="textSecondary">
                            Actually{' '}
                            {fulfillment.type == FulfillmentType.Receipt
                                ? 'received'
                                : 'shipped'}
                        </Typography>
                        <Typography>
                            {Object.keys(qtys).length == 0 && 'None'}
                            {Object.keys(qtys)
                                .map(
                                    (key) =>
                                        `${qtys[key as UnitClass]} ${
                                            key == UnitClass.Count
                                                ? 'Eaches'
                                                : key == UnitClass.Time
                                                ? 'Minutes'
                                                : key == UnitClass.Volume
                                                ? 'Volume'
                                                : key == UnitClass.Weight
                                                ? 'Pounds'
                                                : ''
                                        }`
                                )
                                .join(', ')}
                        </Typography>
                    </Box>
                    <Box sx={{ p: 2 }} />
                    <Box sx={{ position: 'relative' }}>
                        <Grow in={Boolean(percentageTag)}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {percentageTag}
                            </Box>
                        </Grow>
                        <PieChart width={100} height={120}>
                            <Pie
                                data={data}
                                cx={45}
                                cy={55}
                                innerRadius={35}
                                outerRadius={45}
                                paddingAngle={0}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        style={{ border: '0px solid green' }}
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        stroke={'none'}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ p: 1, background: palette.background.paper }}>
                <Collapse in={showBreakdown}>
                    <Box>
                        {fulfillment.lots
                            .find((l) => l.item._id === content.item._id)
                            ?.contents.map((c, cIndex) => (
                                <Box
                                    key={
                                        'content_' +
                                        content.item._id +
                                        '_' +
                                        cIndex
                                    }
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            display: 'flex',
                                        }}
                                    >
                                        <Box>
                                            <Typography>
                                                {c.lot.code}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                Lot
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1 }} />
                                        <Box>
                                            <Typography>{`${c.quantity} ${
                                                c.unit[
                                                    c.quantity === 1
                                                        ? 'english'
                                                        : 'english_plural'
                                                ]
                                            }`}</Typography>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                Total
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider />
                                    <Box p={0.5} />
                                </Box>
                            ))}
                    </Box>
                </Collapse>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        onClick={(event) => setShowBreakdown(!showBreakdown)}
                        variant="text"
                        endIcon={
                            <Anima in={showBreakdown} type="rotate">
                                <Box sx={{ display: 'flex' }}>
                                    <MdExpandMore />
                                </Box>
                            </Anima>
                        }
                    >
                        Lot breakdown
                    </Button>
                    {responses.length > 0 && (
                        <Button
                            onClick={(e) =>
                                setClickState({ target: e.currentTarget })
                            }
                            variant="text"
                            color={failed.length !== 0 ? 'warning' : 'success'}
                        >
                            {failed.length !== 0
                                ? `${failed.length}/${responses.length} checks failed`
                                : passed.length == 1
                                ? 'Passed check!'
                                : `${passed.length}/${responses.length} checks passes`}
                        </Button>
                    )}
                    <Popover
                        open={Boolean(clickState)}
                        anchorEl={clickState ? clickState.target : null}
                        onClose={() => setClickState(null)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {responses.map((check, checkIndex) => (
                            <Box
                                sx={{
                                    padding: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    paddingRight: 3,
                                }}
                                key={'check_' + checkIndex}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        padding: 1,
                                        fontSize: '1.5rem',
                                        color: check.passed
                                            ? palette.success.main
                                            : palette.warning.main,
                                    }}
                                >
                                    {check.passed ? (
                                        <MdCheckCircle />
                                    ) : (
                                        <RiErrorWarningFill />
                                    )}
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                    >
                                        {check.qualityCheck.prompt.phrase}
                                    </Typography>
                                    <Typography>{check.response}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Popover>
                </Box>
            </Box>
        </Box>
    );
};

export default FulfillmentLine;
