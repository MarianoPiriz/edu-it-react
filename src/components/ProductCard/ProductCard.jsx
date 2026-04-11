import { IoHeartOutline , IoHeartSharp } from "react-icons/io5";
import { FALLBACK_IMAGE } from '../../utils/utils';


function ProductCard({ product }) {
  const addToFavorites = (product) => console.log("Added to favorites:", product.title);
  const buyNow = (product) => console.log("Buying now:", product.title);
  const addToCart = (product) => { console.log("Added to cart:", product)};

  return (
    <div className="bg-white shadow-md rounded-lg relative overflow-hidden flex flex-col h-full">
      <button
        className="absolute top-2 right-2 z-10"
        title="add to favorites"
        onClick={() => addToFavorites(product)}
      >
        <IoHeartOutline className=" cursor-pointer text-gray-600 w-5 h-5  transition-colors bg-white rounded-full p-1" />
      </button>
      <img
        src={product.images && product.images.length > 0 ? product.images[0] : FALLBACK_IMAGE}
        alt={product.title}
        className="w-full h-48 object-cover rounded-t-lg bg-gray-100"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.title}</h3>
        <p className="text-gray-600 mt-1 text-sm line-clamp-2 flex-grow">{product.description}</p>
        <p className="text-blue-600 font-bold mt-2">${product.price.toFixed(2)}</p>
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
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
