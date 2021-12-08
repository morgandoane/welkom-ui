import React, { ReactElement } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider = (props: { children: ReactElement }): ReactElement => (
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN + ""}
    clientId={process.env.REACT_APP_CLIENT_ID + ""}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_AUTH0_NAMESPACE + ""}
  >
    {props.children}
  </Auth0Provider>
);

export default AuthProvider;
