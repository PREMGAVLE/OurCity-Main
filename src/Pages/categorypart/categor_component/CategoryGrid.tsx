import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';

interface Category {
  _id: string;
  title?: string;
  name?: string;
  image: string;
}

interface Props {
  categories: Category[];
  onCardClick: (id: string) => void;
  onShowMoreClick?: () => void;
  showMore?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const CategoryGrid: React.FC<Props> = ({
  categories,
  onCardClick,
  onShowMoreClick,
  showMore = false,
}) => (
  <motion.div
    className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-6 justify-items-center"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {categories.map((cat) => (
      <CategoryCard
        key={cat._id}
        image={cat.image}
        title={cat.title || cat.name}
        onClick={() => onCardClick(cat._id)}
      />
    ))}

    {showMore && onShowMoreClick && (
      <motion.div
        className="flex flex-col items-center justify-center text-center p-3 bg-gray-100 rounded-lg cursor-pointer select-none hover:bg-gray-200"
        onClick={onShowMoreClick}
        whileHover="hover"
      >
        <p className="text-sm font-semibold text-blue-600">+ Show More</p>
      </motion.div>
    )}
  </motion.div>
);

export default CategoryGrid;
