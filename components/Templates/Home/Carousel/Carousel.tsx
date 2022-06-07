import React from 'react';
import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { NavLink } from 'components/Atoms';
import { ICategory } from 'interfaces';
import styles from './Carousel.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

type Props = { categories: ICategory[] };

const breakpoints = { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } };

const slideVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.2 * i + 1.8, duration: 0.6 } }),
};

const headingVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { delay: 1.6, duration: 0.4 } },
};

const Carousel = ({ categories }: Props) => {
  const slides = categories.map((category, i) => (
    <SwiperSlide key={category.name}>
      <motion.div className={styles.swiper__slide} variants={slideVariant} custom={i} initial="hidden" animate="visible">
        <Image src={category.photo} width={200} height={200} />
        <NavLink label={category.name} href={`/przepisy/${category.slug}`} className={styles.swiper__link}>
          <span>Sprawdź przepisy</span>
        </NavLink>
      </motion.div>
    </SwiperSlide>
  ));

  return (
    <section className={styles.swiper}>
      <motion.h2 className={styles.swiper__heading} variants={headingVariant} initial="hidden" animate="visible">
        Znajdź przepisy według kategorii
      </motion.h2>
      <Swiper
        spaceBetween={50}
        breakpoints={breakpoints}
        navigation
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {slides}
      </Swiper>
    </section>
  );
};

export default Carousel;
