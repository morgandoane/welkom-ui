import { LottieOptions, useLottie } from "lottie-react";
import { AnimationEventHandler, ReactElement } from "react";
import bb8 from "./directory/bb8.json";

export type AnimationType = "bb8";

export interface AnimationProps extends Omit<LottieOptions, "animationData"> {
  type: AnimationType;
}

export const Animation = (props: AnimationProps): ReactElement => {
  const { type, loop = true, autoplay = true, ...rest } = props;

  const schema: Record<AnimationType, Record<string, unknown>> = {
    bb8,
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
