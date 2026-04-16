import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { FALLBACK_IMAGE } from '../../utils/utils';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';

function ProductCard({ product, isFavoriteProduct }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isInFavorites } = useFavorites();
  const { showToast } = useToast();
  const isFavorite = isInFavorites(product.id);

  const addToFavorites = () => {
    toggleFavorite(product);

    showToast(
      isFavorite
        ? `'${product.title} Removed from favorites'`
        : `'${product.title} Added to favorites'`
    );
  };

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`'${product.title} Added to cart'`);
  };

  // const handleRemoveFromCart = (productId, productName) => {
  //   removeFromCart(productId);
  // };

  const buyNow = (product) => console.log('Buying now:', product.title);
  // const addProduct = (product) => { console.log("Added to cart:", product)};

  return (
    <div className="bg-white shadow-md rounded-lg relative overflow-hidden flex flex-col h-full">
      {isFavoriteProduct && (
        <button
          className="absolute text-white top-2 left-2 z-10"
          onClick={addToFavorites}
        >
          <FaTrash />
        </button>
      )}
      <button
        className="absolute top-2 right-2 z-10"
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={addToFavorites}
      >
        {isFavorite ? (
          <IoHeartSharp className=" cursor-pointer text-blue-600 w-5 h-5  transition-colors bg-white rounded-full p-1" />
        ) : (
          <IoHeartOutline className=" cursor-pointer text-gray-600 w-5 h-5  transition-colors bg-white rounded-full p-1" />
        )}
      </button>

      <img
        src={
          product.images && product.images.length > 0
            ? product.images[0]
            : FALLBACK_IMAGE
        }
        alt={product.title}
        className="w-full h-48 object-cover rounded-t-lg bg-gray-100"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-gray-600 mt-1 text-sm line-clamp-2 flex-grow">
          {product.description}
        </p>
        <p className="text-gray-500 mt-2 text-xs">{product.category.name}</p>
        <p className="text-blue-600 font-bold mt-2">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-2 justify-between mt-4 font-sans text-xs">
          <button
            className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex-1"
            title="buy now"
            onClick={() => buyNow(product)}
          >
            Buy Now
          </button>
          <button
            className="border-2 border-blue-600 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer flex-1"
            title="add to cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
