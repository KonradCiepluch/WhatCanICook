import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from 'components/Templates/Layout/Layout';
import UserProvider from 'context/UserProvider';
import 'styles/Global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Layout>
        <Head>
          <title>What can I cook</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700;900&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"></link>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
};

export default App;
