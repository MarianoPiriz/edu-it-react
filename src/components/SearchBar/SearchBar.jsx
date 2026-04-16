import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onCategoryChange,
  categories = [],
}) => {
  return (
    <div className="mb-6 w-full border border-gray-500 text-sm text-gary-400 rounded-lg relative">
      <IoSearchOutline className="absolute left-3 top-3" />
      <input
        className="bg-transparent focus:outline-none p-2"
        type="text"
        placeholder="Search for anything..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="hidden md:block absolute right-3 top-1 p-1 focus:outline-none bg-transparent"
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map((category) => {
          const cleanName =
            category.charAt(0).toUpperCase() + category.slice(1);
          const displayName =
            cleanName.length > 15
              ? cleanName.substring(0, 12) + "..."
              : cleanName;

          return (
            <option key={category} value={category} className="text-black">
              {displayName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SearchBar;
