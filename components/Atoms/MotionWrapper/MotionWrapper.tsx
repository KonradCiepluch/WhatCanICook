import React from 'react';
import { motion } from 'framer-motion';

type Props = { children: React.ReactNode; className?: string };

const slideVariant = {
  hidden: { x: '-70vw', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.2 } },
  exit: { x: '70vw', opacity: 0, transition: { duration: 0.2 } },
};

const MotionWrapper = ({ className = '', children }: Props) => {
  return (
    <motion.div className={className} variants={slideVariant} animate="visible" initial="hidden" exit="exit">
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
