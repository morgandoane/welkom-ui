import {
    ButtonBase,
    Box,
    Typography,
    useTheme,
    Collapse,
    SxProps,
    Theme,
    useMediaQuery,
    hexToRgb,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../../../../../../../../providers/AppThemeProvider';
import Anima from '../../../../../../../Anima';
import { AppNavRoute } from '../../../../../../routes';

export interface NavChipProps {
    label: string;
    data: AppNavRoute;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const NavChip = (props: NavChipProps): ReactElement => {
    const {
        label,
        data: route,
        open: parentOpen,
        setOpen: setParentOpen,
    } = props;
    const nav = useNavigate();

    const { mode } = useThemeContext();

    const parentActive = route.children
        .map((s) => s[1])
        .some((link) => window.location.pathname.includes(link));

    const [open, setOpen] = React.useState(parentActive);

    React.useEffect(() => {
        if (open) setParentOpen(true);
    }, [open]);

    React.useEffect(() => {
        if (!parentOpen) setOpen(false);
    }, [parentOpen]);

    const { palette, shape, spacing, breakpoints } = useTheme();
    const small = useMediaQuery(breakpoints.down('sm'));

    const onClick = () => {
        if (route.children.length > 1) {
            setOpen(!open);
        } else if (route.children[0]) {
            nav(route.children[0][1]);
        }
    };

    const activeStyles: SxProps<Theme> =
        mode == 'dark'
            ? {
                  background: palette.action.hover,
                  color: palette.primary.main,
                  fontWeight: 900,
              }
            : {
                  background: hexToRgb(palette.primary.main).replace(
                      ')',
                      ', .1)'
                  ),
                  color: palette.primary.main,
              };

    return (
        <React.Fragment>
            <ButtonBase
                onClick={onClick}
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-start',
                    color: 'textSecondary',
                    ...shape,
                    p: small ? 2 : 1,
                    alignItems: 'center',
                    ...(parentActive
                        ? activeStyles
                        : { color: palette.text.secondary }),
                }}
            >
                <Box sx={{ display: 'flex' }}>{route.icon}</Box>
                <Box sx={{ width: spacing(1.5) }} />
                <Collapse in={open || parentOpen} orientation="horizontal">
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                textAlign: 'left',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {label}
                        </Typography>
                        <Box sx={{ width: spacing(small ? 12 : 3) }} />
                        <Box sx={{ flex: 1 }} />
                        {route.children.length > 1 && (
                            <Anima in={open} type="rotate">
                                <Box
                                    sx={{ display: 'flex', fontSize: '1.5rem' }}
                                >
                                    <MdExpandMore />
                                </Box>
                            </Anima>
                        )}
                    </Box>
                </Collapse>
            </ButtonBase>
            <Box sx={{ width: '100%' }}>
                {route.children.length > 1 && (
                    <Collapse in={open}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexFlow: 'column',
                                gap: 1,
                                alignItems: 'flex-start',
                                width: '100%',
                                paddingLeft: 6,
                                paddingBottom: 2,
                                paddingTop: small ? 2 : 1,
                            }}
                        >
                            {route.children.map(([label, link], index) => (
                                <ButtonBase
                                    onClick={() => nav(link)}
                                    sx={{
                                        p: small ? 1 : 0.25,
                                        paddingLeft: small ? 2 : 1,
                                        paddingRight: small ? 2 : 1,
                                        ...shape,
                                        ...(window.location.pathname.includes(
                                            link
                                        )
                                            ? {
                                                  ...activeStyles,
                                                  background: undefined,
                                              }
                                            : {
                                                  color: palette.text.secondary,
                                              }),
                                    }}
                                    key={label + '_' + index}
                                >
                                    <Typography sx={{ fontWeight: 500 }}>
                                        {label}
                                    </Typography>
                                </ButtonBase>
                            ))}
                        </Box>
                    </Collapse>
                )}
            </Box>
        </React.Fragment>
    );
};

export default NavChip;
