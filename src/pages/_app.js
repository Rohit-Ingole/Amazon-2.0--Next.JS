import Head from "next/head";
import "../styles/globals.css";

import { Provider as SessionProvider } from "next-auth/client";
import { store } from "../app/store";
import { Provider as ReduxProvider } from "react-redux";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Amazon 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReduxProvider store={store}>
        <SessionProvider session={pageProps.session}>
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
      </ReduxProvider>
    </>
  );
}

export default MyApp;
