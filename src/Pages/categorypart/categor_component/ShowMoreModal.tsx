import React from 'react';
import CategoryCard from './CategoryCard';
import CategorySearch from './CategorySearch';

interface Category {
  _id: string;
  title?: string;
  name?: string;
  image: string;
}

interface Props {
  categories: Category[];
  searchTerm: string;
  onClose: () => void;
  onSearch: (val: string) => void;
  onCardClick: (id: string) => void;
}

const ShowMoreModal: React.FC<Props> = ({
  categories,
  searchTerm,
  onClose,
  onSearch,
  onCardClick,
}) => {
  const filtered = categories.filter((c) =>
    (c.title || c.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-transparent z-50 flex items-center justify-end pr-6">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[95vh] shadow-lg overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          <h2 className="text-xl font-semibold">More Categories</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <CategorySearch />
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {filtered.length > 0 ? (
            filtered.map((cat) => (
              <CategoryCard
                key={cat._id}
                image={cat.image}
                title={cat.title || cat.name}
                onClick={() => {
                  onCardClick(cat._id);
                  onClose();
                }}
                hover={false}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No categories found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowMoreModal;
