import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';

const FavoritesProducts = () => {
  const { favorites } = useFavorites();

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold p-4 text-left">My Favorites</h2>
      <hr className="mb-4"></hr>
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Your wish list is empty
          </h2>
          <p className="text-gray-500">
            Looks like you haven't added anything yet...
          </p>

          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Go back to shop
          </Link>
        </div>
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
