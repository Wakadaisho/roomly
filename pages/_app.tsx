import App, { AppProps } from "next/app";

import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import nookies from "nookies";

import Axios from "axios";

import "../styles/globals.css";
import "tippy.js/dist/tippy.css";

function MyApp({ Component, pageProps }: AppProps) {
  const APOLLO_CLIENT = new ApolloClient({
    // uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: "http://localhost:1337/graphql",
      headers: {
        Authorization: `Bearer ${pageProps.jwt}`,
      },
    }) as unknown as ApolloLink,
  });

  Axios.defaults.headers.post["Content-Type"] = "application/json";

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
