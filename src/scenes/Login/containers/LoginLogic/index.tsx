import { useAuth0 } from "@auth0/auth0-react";
import React, { ReactElement } from "react";
import { LoginRenderProps } from "../LoginRender";

const LoginLogic = (props: {
  children: (props: LoginRenderProps) => ReactElement;
}): ReactElement => {
  const { children } = props;

  const {
    loginWithRedirect,
    isLoading: loading,
    isAuthenticated,
    error: authError,
    handleRedirectCallback,
  } = useAuth0();

  const [error, setError] = React.useState<Error | null>(null);

  return (
    <React.Fragment>
      {children({
        onClick: () => loginWithRedirect(),
        loading,
        error,
        reset: () => setError(null),
      })}
    </React.Fragment>
  );
};

export default LoginLogic;
