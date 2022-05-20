import React from 'react';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';

import { IUserShoppingList } from 'interfaces';
import { getShoppingList } from 'lib/firebaseData';
import { ShoppingList } from 'components/Templates';

interface IProps {
  userShoppingList: IUserShoppingList | null;
}

const ShoppingListPage = ({ userShoppingList }: IProps) => {
  return <ShoppingList userShoppingList={userShoppingList} />;
};

export default ShoppingListPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const userId = getCookie('userId', { req, res }) as string;
    const userShoppingList = await getShoppingList(userId);

    return {
      props: {
        userShoppingList,
      },
    };
  } catch (e) {
    return {
      props: {
        userShoppingList: null,
      },
    };
  }
};
