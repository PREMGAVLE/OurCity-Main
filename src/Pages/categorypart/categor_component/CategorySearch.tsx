import { useState } from "react";
// import axios from "../../../../../axios";
import axois from "@/axois";

interface Category {
  _id: string;
  categoryName?: string;
}

const CategorySearch: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    const trimmedSearch = searchText.trim();
    if (!trimmedSearch) return;

    try {
      setLoading(true);
      setHasSearched(true);
      setError('');

      const response = await axois.get('/category/searchCategory', {
        params: { search: trimmedSearch.toLowerCase() },
      });

      console.log("API Response:", response.data);

      setCategories(response.data?.data || []);
    } catch (error) {
      console.error("Search failed:", error);
      setCategories([]);
      setError('Failed to fetch categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white">
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter category name"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-blue-500 text-center">Searching...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && hasSearched && categories.length === 0 && (
        <p className="text-center text-gray-500">No categories found for "{searchText}"</p>
      )}

      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition"
          >
            <p className="font-medium text-gray-800">{cat.categoryName || 'Unnamed Category'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySearch;
