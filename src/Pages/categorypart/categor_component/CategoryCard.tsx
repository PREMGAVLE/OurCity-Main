import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  image: string;
  title?: string;
  onClick: () => void;
  hover?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.05,
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3 },
  },
};

const CategoryCard: React.FC<Props> = ({ image, title, onClick, hover = true }) => {
  const Wrapper = hover ? motion.div : 'div';

  return (
    <Wrapper
      className="flex flex-col items-center justify-center text-center p-3 bg-white rounded-lg cursor-pointer select-none"
      onClick={onClick}
      variants={itemVariants}
      whileHover={hover ? 'hover' : undefined}
    >
      <img src={image} alt={title || 'category'} className="w-12 h-12 object-contain mb-2" />
      <p className="text-sm font-semibold text-gray-800">{title}</p>
    </Wrapper>
  );
};

export default CategoryCard;
