import { useAuth0 } from "@auth0/auth0-react";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const UnauthenticatedRoute = (props: {
  children: ReactElement | ReactElement[];
}): ReactElement => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default UnauthenticatedRoute;
