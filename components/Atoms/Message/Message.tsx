import React from 'react';
import Link from 'next/link';

import styles from './Message.module.scss';

const Message = ({ message }: { message: string }) => (
  <div className={styles.message}>
    <h1 className={styles.message__heading}>{message}</h1>
    <Link href="/login">Strona logowania</Link>
  </div>
);

export default Message;
