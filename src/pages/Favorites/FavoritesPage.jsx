import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import ProductCard from '../../components/ProductCard/ProductCard';

const FavoritesProducts = () => {
  const { favorites } = useFavorites();

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold p-4 text-left">My Favorites</h2>
      <hr className="mb-4"></hr>
      {favorites.length === 0 ? (
        <p>No favorites added yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavoriteProduct={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesProducts;
