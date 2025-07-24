import React, { useState, useEffect } from 'react';
import { Atom } from 'react-loading-indicators';
import { motion, Variants } from 'framer-motion';
 import ExplorePhoneview from './explore_component/ExplorePhoneview';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Explore: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {loading ? (
        <Atom color="#fa0606" size="medium" text="" textColor="#f40c0c" />
      ) : (
        <motion.div
          className="w-full max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <ExplorePhoneview />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Explore;
