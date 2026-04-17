import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import { useProducts } from '../../context/ProductContext';

function ProductList() {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all categories');
  const [filter, setFilter] = useState({
    filterType: 'price',
    filterOrder: 'asc',
  });

  const categoryList = [
    'all categories',
    ...new Set(products.map((product) => product.category?.name)),
  ].filter(Boolean);

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryFilteredProducts =
      category === 'all categories'
        ? true
        : product.category.name.toLowerCase() === category.toLowerCase();
    return categoryFilteredProducts && matchesSearchTerm;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const { filterType, filterOrder } = filter;

    const getValue = (item) => {
      if (filterType === 'price') return item.price;
      if (filterType === 'category') return item.category?.name || '';
      return item[filterType] || '';
    };

    const valA = getValue(a);
    const valB = getValue(b);

    if (filterType === 'price') {
      return filterOrder === 'asc' ? valA - valB : valB - valA;
    }

    const strA = valA.toString().toLowerCase();
    const strB = valB.toString().toLowerCase();

    return filterOrder === 'asc'
      ? strA.localeCompare(strB)
      : strB.localeCompare(strA);
  });

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">Error: {error.message}</p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategory}
        categories={categoryList}
      />
      {filteredProducts.length === 0 ? (
        <p className="text-center py-10">
          No products found for "{searchTerm}"
        </p>
      ) : (
        <>
          <Filter onFilterApplied={setFilter} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductList;
