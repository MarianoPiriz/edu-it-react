import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ searchTerm, onSearchChange, onCategoryChange }) => {
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
      
      <select className="hidden md:block absolute right-3 top-1 p-1 focus:outline-none bg-transparent"
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all categories">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>
    </div>
  );
};

export default SearchBar;
