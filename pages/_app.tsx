import App, { AppProps } from "next/app";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import nookies from "nookies";

import Axios from "axios";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const APOLLO_CLIENT = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: "http://localhost:1337/graphql",
      headers: {
        Authorization: `Bearer ${pageProps.jwt}`,
      },
    }),
  });
  Axios.defaults.headers.post["Content-Type"] = "application/json";

  console.log("cookies", pageProps);

  return (
    <ApolloProvider client={APOLLO_CLIENT}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  appProps.pageProps["jwt"] = nookies.get(appContext.ctx).jwt;

  return { ...appProps };
};

export default MyApp;
