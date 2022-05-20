import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { MotionWrapper, Button } from 'components/Atoms';
import { useUser } from 'context/UserProvider';
import { IUserShoppingList } from 'interfaces';
import { deleteShoppingList } from 'lib/firebaseData';
import useRequestState from 'hooks/useRequestState';
import styles from './ShoppingList.module.scss';

interface IProps {
  userShoppingList: IUserShoppingList | null;
}

const errorMsg = 'Podczas operacji wystapił błąd. Spróbuj ponownie';

const ShoppingList = ({ userShoppingList }: IProps) => {
  const [userList, setUserList] = useState<IUserShoppingList | null>(userShoppingList);

  const { push } = useRouter();

  const { authenticatedUser } = useUser();

  const [{ isLoadingState, isErrorState, errMsg }, handleRequest] = useRequestState();

  const handleRemoveList = useCallback(async () => {
    try {
      await deleteShoppingList(userShoppingList.docId);
      setUserList(null);
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  useEffect(() => {
    if (!authenticatedUser) push('/');
  }, [authenticatedUser, push]);

  const items =
    userList &&
    userList.products.map(({ name, amount, unit }) => (
      <li key={name + unit} className={styles.shopping__product}>
        {name} {amount} {unit}
      </li>
    ));

  return (
    <MotionWrapper className={styles.shopping}>
      {userList ? (
        <>
          <h1 className={styles.shopping__heading}>Lista zakupów</h1>
          <ul className={styles.shopping__products}>{items}</ul>
          <Button
            label="Usuń listę zakupów"
            handleClick={() => handleRequest(handleRemoveList, errorMsg)}
            isLoading={isLoadingState}
            disabled={isLoadingState}
          />
          {isErrorState ? <p className={styles.shopping__error}>{errMsg}</p> : null}
        </>
      ) : (
        <h1 className={styles.shopping__heading}>Utwórz listę zakupów dodając produkty na stronie przepisu</h1>
      )}
    </MotionWrapper>
  );
};

export default ShoppingList;
