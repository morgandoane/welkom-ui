import {
    Box,
    Button,
    Collapse,
    IconButton,
    Popover,
    Typography,
    useTheme,
} from '@mui/material';
import { id } from 'date-fns/locale';
import React, { ReactElement } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { MdCheckCircle, MdExpandMore, MdEdit } from 'react-icons/md';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Anima from '../../../../../../../../components/Anima';
import AppFab from '../../../../../../../../components/AppFab';
import { Fulfillment } from '../../../../../../../../graphql/schema/Fulfillment/Fulfillment';
import { useClickState } from '../../../../../../../../hooks/useClickState';

export interface FulfillmentContentsProps {
    fulfillment: Fulfillment;
}

const FulfillmentContents = (props: FulfillmentContentsProps): ReactElement => {
    const { fulfillment } = props;

    const nav = useNavigate();

    const { palette } = useTheme();

    const [clickState, setClickState] = useClickState();

    const [expanded, setExpanded] = React.useState(false);

    const open = Boolean(clickState);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box sx={{ paddingTop: 3 }}>
            <Typography
                sx={{ maxWidth: 480 }}
            >{`This ${fulfillment.type.toLowerCase()} contains ${
                fulfillment.lots.length
            } lot${
                fulfillment.lots.length == 1 ? '' : 's'
            }. Each lot inside a ${fulfillment.type.toLowerCase()} may contain fragments of other lots, grouped together by item.`}</Typography>
            <Box
                sx={{
                    paddingTop: 2,
                    maxWidth: 600,
                }}
            >
                {fulfillment.lots.map((lot) => (
                    <Box
                        key={lot._id}
                        sx={{ borderBottom: `1px solid ${palette.divider}` }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexFlow: 'row',
                                alignItems: 'center',
                                gap: 3,
                                padding: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    fontSize: '3rem',
                                    color: palette.text.secondary,
                                }}
                            >
                                <BsBoxSeam />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">
                                    {`${lot.item.english} - ${
                                        [
                                            ...new Set(
                                                lot.contents.map(
                                                    (c) => c.unit._id
                                                )
                                            ),
                                        ].length == 1
                                            ? `${lot.contents.reduce(
                                                  (acc, item) => {
                                                      return (
                                                          acc + item.quantity
                                                      );
                                                  },
                                                  0
                                              )} ${
                                                  lot.contents[0].unit[
                                                      lot.contents.reduce(
                                                          (acc, item) => {
                                                              return (
                                                                  acc +
                                                                  item.quantity
                                                              );
                                                          },
                                                          0
                                                      ) == 1
                                                          ? 'english'
                                                          : 'english_plural'
                                                  ]
                                              }`
                                            : lot.contents.map(
                                                  (c) =>
                                                      `${c.quantity} ${
                                                          c.unit[
                                                              c.quantity == 1
                                                                  ? 'english'
                                                                  : 'english_plural'
                                                          ]
                                                      }`
                                              )
                                    }`}
                                </Typography>
                                <Typography color="textSecondary">
                                    {`Contains ${lot.contents.length} lot${
                                        lot.contents.length == 1 ? '' : 's'
                                    }`}
                                </Typography>
                                {lot.quality_check_responses.length > 0 && (
                                    <Box>
                                        <Button
                                            onClick={(event) => {
                                                setClickState({
                                                    target: event.currentTarget,
                                                });
                                            }}
                                            startIcon={
                                                lot.quality_check_responses.some(
                                                    (check) => !check.passed
                                                ) ? (
                                                    <RiErrorWarningFill />
                                                ) : (
                                                    <MdCheckCircle />
                                                )
                                            }
                                            color={
                                                lot.quality_check_responses.some(
                                                    (check) => !check.passed
                                                )
                                                    ? 'warning'
                                                    : 'success'
                                            }
                                            variant="text"
                                        >
                                            {lot.quality_check_responses.some(
                                                (check) => !check.passed
                                            )
                                                ? `Failed ${
                                                      lot.quality_check_responses.filter(
                                                          (check) =>
                                                              !check.passed
                                                      ).length
                                                  } quality checks`
                                                : 'Passed all quality checks'}
                                        </Button>
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={
                                                clickState
                                                    ? clickState.target
                                                    : null
                                            }
                                            onClose={() => setClickState(null)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                        >
                                            {lot.quality_check_responses.map(
                                                (check, checkIndex) => (
                                                    <Box
                                                        sx={{
                                                            padding: 1,
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 1,
                                                            paddingRight: 3,
                                                        }}
                                                        key={
                                                            'check_' +
                                                            checkIndex
                                                        }
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                padding: 1,
                                                                fontSize:
                                                                    '1.5rem',
                                                                color: check.passed
                                                                    ? palette
                                                                          .success
                                                                          .main
                                                                    : palette
                                                                          .warning
                                                                          .main,
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
                                                                {
                                                                    check
                                                                        .qualityCheck
                                                                        .prompt
                                                                        .phrase
                                                                }
                                                            </Typography>
                                                            <Typography>
                                                                {check.response}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                )
                                            )}
                                        </Popover>
                                    </Box>
                                )}
                            </Box>
                            <Box>
                                <Anima type="rotate" in={expanded}>
                                    <IconButton
                                        onClick={() => setExpanded(!expanded)}
                                    >
                                        <MdExpandMore />
                                    </IconButton>
                                </Anima>
                            </Box>
                        </Box>
                        <Box>
                            <Collapse in={expanded}>
                                <Box
                                    sx={{
                                        padding: 1,
                                        paddingLeft: 15,
                                    }}
                                >
                                    {lot.contents.map((lotContent) => (
                                        <Box
                                            key={lotContent.lot._id}
                                            sx={{ paddingBottom: 2 }}
                                        >
                                            <Typography>{`Lot # ${
                                                lotContent.lot.code
                                            } - ${lotContent.quantity} ${
                                                lotContent.unit[
                                                    lotContent.quantity == 1
                                                        ? 'english'
                                                        : 'english_plural'
                                                ]
                                            }`}</Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {lotContent.lot.company
                                                    ? lotContent.lot.company
                                                          .name
                                                    : ''}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        </Box>
                    </Box>
                ))}
            </Box>
            <AppFab
                icon={<MdEdit />}
                onClick={() => nav('edit')}
            >{`Edit ${fulfillment.type}`}</AppFab>
        </Box>
    );
};

export default FulfillmentContents;
