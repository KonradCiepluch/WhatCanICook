import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { IRecipe } from 'interfaces';
import arrow from 'assets/arrow.svg';
import { NavLink } from 'components/Atoms';
import styles from './Hero.module.scss';

type Props = { recipe: IRecipe };

const headingVariant = { hidden: { opacity: 0, x: -200 }, visible: { opacity: 1, x: 0, transition: { delay: 0.8, duration: 1 } } };

const divVariant = { hidden: { opacity: 0, x: 200 }, visible: { opacity: 1, x: 0, transition: { delay: 0.8, duration: 1 } } };

const Hero = ({
  recipe: {
    name,
    photo,
    slug,
    category: { categorySlug, subcategorySlug },
  },
}: Props) => {
  return (
    <section className={styles.hero}>
      <motion.h1 className={styles.hero__heading} variants={headingVariant} initial="hidden" animate="visible">
        {name}
        <NavLink label="Przejdź do przepisu" href={`/przepisy/${categorySlug}/${subcategorySlug}/${slug}`} className={styles.hero__link}>
          <Image src={arrow.src} height={10} width={20} />
        </NavLink>
      </motion.h1>
      <motion.div className={styles.hero__image} variants={divVariant} initial="hidden" animate="visible">
        <Image src={photo} layout="fill" />
      </motion.div>
    </section>
  );
};

export default Hero;
