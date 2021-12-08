import React, { ReactElement } from "react";

const PublicRoute = (props: {
  children: ReactElement | ReactElement[];
}): ReactElement => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default PublicRoute;
