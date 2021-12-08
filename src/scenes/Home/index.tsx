import React, { ReactElement } from "react";
import HomeData from "./containers/HomeData";
import HomeLogic from "./containers/HomeLogic";
import HomeRender from "./containers/HomeRender";

const Home = (): ReactElement => (
  <HomeData>
    {(dataProps) => (
      <HomeLogic {...dataProps}>
        {(logicProps) => <HomeRender {...logicProps} />}
      </HomeLogic>
    )}
  </HomeData>
);

export default Home;
