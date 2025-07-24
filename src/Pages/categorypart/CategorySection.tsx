import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from '@/axois';

interface Category {
  _id: string;
  title?: string;
  name?: string;
  image: string;
}

const MAX_VISIBLE = 10;

const CategorySection: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    axios.get("/category/getCategory")
      .then((res) => {
        const categoryData = Array.isArray(res.data?.data) ? res.data.data : res.data;
        if (Array.isArray(categoryData)) setData(categoryData);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const startAutoScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);

    scrollIntervalRef.current = setInterval(() => {
      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    }, 30);
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const pauseAndResumeScroll = () => {
    stopAutoScroll();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 3000);
  };

  useEffect(() => {
    if (!showMore) startAutoScroll();
    return () => stopAutoScroll();
  }, [showMore, data]);

  const visibleCategories = data.slice(0, MAX_VISIBLE);
  const hiddenCategories = data.slice(MAX_VISIBLE);
  const filteredCategories = hiddenCategories.filter((category) =>
    (category.title || category.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal = () => {
    setShowMore(false);
    setSearchTerm('');
    setTimeout(() => startAutoScroll(), 100);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) closeModal();
  };

  return (
    <>
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="px-4 py-10 relative bg-gradient-to-br from-white to-orange-50 overflow-x-hidden">
       <h1 className="text-3xl font-extrabold mb-8 text-center text-black">
  ✨ Explore Categories ✨
</h1>

        <div className={showMore ? 'blur-sm pointer-events-none select-none' : ''}>
          {!showMore && (
            <div
              ref={scrollRef}
              className="grid grid-flow-col auto-cols-[140px] gap-6 overflow-x-auto pb-2 scrollbar-hide px-1"
              onMouseEnter={pauseAndResumeScroll}
              onMouseLeave={() => !showMore && startAutoScroll()}
            >
              {visibleCategories.map((category, index) => (
                <motion.div
                  key={category._id || index}
                  className="flex flex-col items-center justify-center text-center transition-transform hover:scale-105 cursor-pointer duration-300"
                  whileHover={{ scale: 1.07 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onClick={() => {
                    pauseAndResumeScroll();
                    navigate(`/subcategory/${category._id}`);
                  }}
                >
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-gray-200 shadow-md flex items-center justify-center overflow-hidden mb-2">
                    <img
                      src={category.image}
                      alt={category.title || 'category'}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    {category.title || category.name}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {hiddenCategories.length > 0 && !showMore && (
            <div className="text-center mt-8">
              <button
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition"
                onClick={() => {
                  stopAutoScroll();
                  setShowMore(true);
                }}
              >
                🔎 Show More
              </button>
            </div>
          )}
        </div>

        {showMore && (
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden"
            onClick={handleOverlayClick}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-[90%] max-h-[80vh] overflow-y-auto p-4 relative shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-3/4 px-3 py-2 border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                  autoFocus
                />
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-red-500 text-3xl font-bold bg-white rounded-full shadow-md w-9 h-9 flex items-center justify-center ml-4"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, index) => (
                    <div
                      key={category._id || index}
                      className="flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:bg-gray-100 transition-all rounded-lg"
                      onClick={() => {
                        navigate(`/subcategory/${category._id}`);
                        closeModal();
                      }}
                    >
                      <div className="w-14 h-14 rounded-full bg-gray-100 shadow flex items-center justify-center overflow-hidden mb-2">
                        <img
                          src={category.image}
                          alt={category.title || 'category'}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        {category.title || category.name}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">No categories found</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategorySection;
