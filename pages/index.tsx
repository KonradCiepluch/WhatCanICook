import React from 'react';
import { getDocs } from 'firebase/firestore';

import { recipesRef } from 'firebaseInit/firebase';

type Props = { recipes: any };

const HomePage = ({ recipes }: Props) => {
  console.log(recipes);
  return <div>Home</div>;
};

export default HomePage;

export const getStaticProps = async () => {
  try {
    const { docs } = await getDocs(recipesRef);
    const recipes = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { props: { recipes } };
  } catch (e) {
    return { props: { recipes: [] } };
  }
};
