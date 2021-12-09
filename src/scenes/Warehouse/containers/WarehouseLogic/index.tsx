import React, { ReactElement } from "react";
import { WarehouseRenderProps } from "../WarehouseRender";

export interface WarehouseLogicProps {
  data: WarehouseRenderProps["data"];
}

const WarehouseLogic = (
  props: WarehouseLogicProps & {
    children: (props: WarehouseRenderProps) => ReactElement;
  }
): ReactElement => {
  const { data, children } = props;

  return <React.Fragment>{children({ data })}</React.Fragment>;
};

export default WarehouseLogic;
