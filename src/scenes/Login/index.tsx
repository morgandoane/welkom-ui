import React, { ReactElement } from "react";
import LoginLogic from "./containers/LoginLogic";
import LoginRender from "./containers/LoginRender";

const Login = (): ReactElement => (
  <LoginLogic>{(logicProps) => <LoginRender {...logicProps} />}</LoginLogic>
);

export default Login;
