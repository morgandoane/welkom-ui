import React, { ReactElement } from "react";
import {
  ApolloClient,
  ApolloProvider as Provider,
  createHttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../scenes/Loading";

const ApolloProvider = (props: { children: ReactElement }): ReactElement => {
  const { getAccessTokenSilently, isLoading } = useAuth0();

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
  });

  const authLink = setContext(async () => {
    const token = await getAccessTokenSilently();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ extensions }) => {
        if (extensions && extensions.code)
          switch (extensions.code) {
            case "UNAUTHENTICATED": {
              window.location.replace("/logout");
              break;
            }
          }
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(from([errorLink, httpLink])),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  if (isLoading) return <Loading message="Apollo intializing" />;

  return <Provider client={apolloClient}>{props.children}</Provider>;
};

export default ApolloProvider;
