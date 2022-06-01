import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getCategories, getRecipes } from 'lib/firebaseData';
import Layout from 'components/Templates/Layout/Layout';
import UserProvider from 'context/UserProvider';
import { ICategory, IRecipe } from 'interfaces';
import 'styles/Global.scss';

interface IApp extends AppProps {
  categories: ICategory[];
  recipes: IRecipe[];
}

const App = ({ Component, pageProps, categories, recipes }: IApp) => {
  const { pathname } = useRouter();

  return (
    <UserProvider>
      <Head>
        <title>What can I cook</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"></link>
      </Head>
      <Layout categories={categories} recipes={recipes}>
        <Component key={pathname} {...pageProps} />
      </Layout>
    </UserProvider>
  );
};

export default App;

App.getInitialProps = async () => {
  try {
    const [categories, recipes] = await Promise.all([getCategories(), getRecipes()]);

    return { categories, recipes };
  } catch (e) {
    console.error(e);
    return { categories: [], recipes: [] };
  }
};
