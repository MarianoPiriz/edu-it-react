import React from "react";

const Filter = ({onFilterApplied}) => {
    const handleSelectChange = (e) => {
    const value = e.target.value;
    
    if (!value.includes(":")) {
      onFilterApplied({ filterType: value, filterOrder: "asc" });
      return;
    }

    const [type, order] = value.split(":");
    onFilterApplied({ filterType: type, filterOrder: order });
  };
  return (
    <div className="w-full">
      <div className="flex mb-4 text-xs justify-self-end gap-2">
        <span>Sort by:</span>
        <select className="bg-transparent" name="" id=""
        onChange={handleSelectChange}>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="title:asc">Name [A-Z]</option>
          <option value="title:desc">Name [Z-A]</option>
          <option value="category:asc">Category[A-Z]</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
