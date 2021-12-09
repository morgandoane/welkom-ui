import React, { ReactElement } from "react";
import WarehouseData from "./containers/WarehouseData";
import WarehouseLogic from "./containers/WarehouseLogic";
import WarehouseRender from "./containers/WarehouseRender";

const Warehouse = (): ReactElement => (
  <WarehouseData>
    {(dataProps) => (
      <WarehouseLogic {...dataProps}>
        {(logicProps) => <WarehouseRender {...logicProps} />}
      </WarehouseLogic>
    )}
  </WarehouseData>
);

export default Warehouse;
