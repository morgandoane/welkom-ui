import React, { ReactElement } from "react";
import { WarehouseLogicProps } from "../WarehouseLogic";

export interface WarehouseDataProps {
  children: (props: WarehouseLogicProps) => ReactElement;
}

const WarehouseData = (props: WarehouseDataProps): ReactElement => {
  const { children } = props;

  return <React.Fragment>{children({ data: null })}</React.Fragment>;
};

export default WarehouseData;
