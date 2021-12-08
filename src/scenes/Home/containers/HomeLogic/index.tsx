import React, { ReactElement } from "react";
import { HomeRenderProps } from "../HomeRender";

export interface HomeLogicProps {
  data: HomeRenderProps["data"];
}

const HomeLogic = (
  props: HomeLogicProps & { children: (props: HomeRenderProps) => ReactElement }
): ReactElement => {
  const { data, children } = props;

  return <React.Fragment>{children({ data })}</React.Fragment>;
};

export default HomeLogic;
