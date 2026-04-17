import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useProductActions } from '../../hooks/useProductActions';
import {
  IoHeartSharp,
  IoHeartOutline,
  IoChevronForwardSharp,
  IoChevronBackSharp,
} from 'react-icons/io5';
import {
  FaCcMastercard,
  FaCcVisa,
  FaCcAmex,
  FaCcDiscover,
} from 'react-icons/fa6';

import { FALLBACK_IMAGE } from '../../utils/utils';

const ProductPage = () => {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { handleAddToCart, buyNow, handleToggleFavorite, checkIfFavorite } =
    useProductActions();

  const product = products.find((p) => p.id === Number(id));

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (!product) {
    return <p>Product not found</p>;
  }
  const isFavorite = product ? checkIfFavorite(product.id) : false;
  const images = product?.images || [];

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col sm:flex-row  p-4 gap-4">
        <div className="relative w-full sm:w-1/2">
          <button
            className="absolute top-2 right-2 z-10"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => handleToggleFavorite(product)}
          >
            {isFavorite ? (
              <IoHeartSharp className=" cursor-pointer text-blue-600 w-5 h-5  transition-colors bg-white rounded-full p-1" />
            ) : (
              <IoHeartOutline className=" cursor-pointer text-gray-600 w-5 h-5  transition-colors bg-white rounded-full p-1" />
            )}
          </button>
          <div className="relative aspect-square w-full overflow-hidden">
            <img
              src={images[currentImageIndex] || FALLBACK_IMAGE}
              alt={product.title}
              className="h-full w-full object-cover rounded-md"
            />
            {images.length > 1 && (
              <>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={prevImage}
                  className="absolute left-4 bottom-4 bg-white/50 p-2 rounded-full hover:bg-white"
                >
                  <IoChevronBackSharp />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 bottom-4 bg-white/50 p-2 rounded-full hover:bg-white"
                >
                  <IoChevronForwardSharp />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:w-1/2 justify-between">
          <div className="flex flex-col items-start h-full justify-between">
            <h1 className="text-2xl font-bold text-left">{product.title}</h1>
            <p className="text-gray-600 mt-1 text-sm text-left">
              {product.description}
            </p>

            <p className="text-gray-800 mt-2 text-xs">
              Updated on{' '}
              {product.updatedAt
                ? product.updatedAt.slice(0, 10)
                : 'No date available'}
            </p>
            <p className="text-gray-500 mt-2 text-xs">
              {product.category.name}
            </p>
            <p className="text-blue-600 font-bold mt-2">
              ${product.price.toFixed(2)}
            </p>
          </div>
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
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="w-full text-left p-4">
        <h2 className="font-bold">Shipping, returns, and payments</h2>
        <hr />
        <div className="flex mt-4 gap-4">
          <h3 className="font-bold text-gray-800">Shipping:</h3>
          <p className="text-sm">
            International shipment of items may be subject to customs processing
            and additional charges.
          </p>
        </div>
        <div className="flex mt-4 gap-4">
          <h3 className="font-bold text-gray-800 ">Returns:</h3>
          <p className="text-sm">Seller does not accept returns. </p>
        </div>
        <div className="flex mt-4 gap-4">
          <h3 className="font-bold text-gray-800">Payments:</h3>
          <div className="flex text-gray-800 text-[2rem] gap-2">
            <FaCcAmex />
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcDiscover />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
