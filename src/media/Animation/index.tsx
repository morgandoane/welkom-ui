import { LottieOptions, useLottie } from 'lottie-react';
import { ReactElement } from 'react';
import bb8 from './directory/bb8.json';
import warning from './directory/warning.json';
import info from './directory/info.json';
import success from './directory/success.json';
import notFound from './directory/notFound.json';
import blobPrimary from './directory/blobPrimary.json';
import blobDark from './directory/blobDark.json';
import cubeDark from './directory/cubeDark.json';
import cubeLight from './directory/cubeLight.json';
import gear from './directory/gear.json';

export type AnimationType =
    | 'bb8'
    | 'warning'
    | 'info'
    | 'success'
    | 'notFound'
    | 'blobPrimary'
    | 'blobDark'
    | 'cubeDark'
    | 'cubeLight'
    | 'gear';

export interface AnimationProps extends Omit<LottieOptions, 'animationData'> {
    type: AnimationType;
}

export const Animation = (props: AnimationProps): ReactElement => {
    const { type, loop = true, autoplay = true, ...rest } = props;

    const schema: Record<AnimationType, Record<string, unknown>> = {
        bb8,
        warning,
        info,
        success,
        notFound,
        blobPrimary,
        blobDark,
        cubeDark,
        cubeLight,
        gear,
    };

    const options: LottieOptions = {
        animationData: schema[type],
        loop,
        autoplay,
        ...rest,
        start: 0,
    };

    const { View } = useLottie(options);

    return View;
};
