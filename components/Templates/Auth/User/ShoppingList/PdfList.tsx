import React from 'react';

import { IUserShoppingList } from 'interfaces';

interface IProps {
  userShoppingList: IUserShoppingList;
  user: string;
}

const listStyle = {
  margin: '20px 0 0 0',
  padding: '0 15px',
  listStyle: 'none',
};

const PdfList = ({ userShoppingList, user }: IProps) => {
  const items = userShoppingList.products.map(({ name, amount, unit }) => (
    <li key={name + unit} style={{ padding: '5px 0', fontWeight: 500, textAlign: 'left', textTransform: 'capitalize' }}>
      {name} {amount} {unit}
    </li>
  ));

  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 500, textAlign: 'center' }}>Lista zakupów</h1>
      <ul style={listStyle}>{items}</ul>
      <p style={{ margin: '15px 0' }}>Użytkownik: {user}</p>
    </div>
  );
};

export default PdfList;
