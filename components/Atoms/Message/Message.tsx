import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Message.module.scss';

const Message = ({ message }: { message: string }) => {
  const { pathname } = useRouter();

  return (
    <div className={styles.message}>
      <h3 className={styles.message__heading}>{message}</h3>
      {!pathname.includes('/uzytkownik') ? <Link href="/login">Strona logowania</Link> : null}
    </div>
  );
};

export default Message;
