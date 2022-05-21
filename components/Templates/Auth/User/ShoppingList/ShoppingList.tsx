import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useRouter } from 'next/router';

import { useUser } from 'context/UserProvider';
import useRequestState from 'hooks/useRequestState';
import { deleteShoppingList, downloadPdfFile } from 'lib/firebaseData';
import { IUserShoppingList } from 'interfaces';
import { MotionWrapper, Button } from 'components/Atoms';
import PdfList from './PdfList';
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

  useEffect(() => {
    if (!authenticatedUser) push('/');
  }, [authenticatedUser, push]);

  const handleRemoveList = useCallback(async () => {
    try {
      await deleteShoppingList(userShoppingList.docId);
      setUserList(null);
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  const handleDownload = useCallback(async () => {
    const html = renderToStaticMarkup(<PdfList userShoppingList={userShoppingList} user={authenticatedUser.displayName} />);
    try {
      await downloadPdfFile(html);
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  const buttonsContent = useMemo(
    () => [
      { label: 'Usuń listę zakupów', callback: () => handleRequest(handleRemoveList, errorMsg) },
      { label: 'Pobierz jako pdf', callback: () => handleRequest(handleDownload, errorMsg) },
    ],
    [handleRequest, handleRemoveList, handleDownload]
  );

  const buttons = buttonsContent.map(({ label, callback }) => (
    <Button key={label} label={label} handleClick={callback} isLoading={isLoadingState} disabled={isLoadingState} />
  ));

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
          {buttons}
          {isErrorState ? <p className={styles.shopping__error}>{errMsg}</p> : null}
        </>
      ) : (
        <h1 className={styles.shopping__heading}>Utwórz listę zakupów dodając produkty na stronie przepisu</h1>
      )}
    </MotionWrapper>
  );
};

export default ShoppingList;
