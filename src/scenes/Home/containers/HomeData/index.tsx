import React, { ReactElement } from "react";
import { HomeLogicProps } from "../HomeLogic";

export interface HomeDataProps {
  children: (props: HomeLogicProps) => ReactElement;
}

const HomeData = (props: HomeDataProps): ReactElement => {
  const { children } = props;

  return <React.Fragment>{children({ data: null })}</React.Fragment>;
};

export default HomeData;
