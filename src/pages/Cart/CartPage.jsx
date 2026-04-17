import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FALLBACK_IMAGE, calculateCartTotals } from '../../utils/utils';
import { FaTrash } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { user } = useAuth();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { subtotal, shippingCost, total } = calculateCartTotals(cart);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const addressFinder =
    user?.billingAddress?.find((addr) => addr.type === 'Shipping') ||
    user?.billingAddress?.find((addr) => addr.type === 'Home') ||
    user?.billingAddress?.[0];

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(
    addressFinder?.id || ''
  );
  const shippingAddress = user?.billingAddress?.find(
    (addr) => addr.id === Number(selectedAddressId)
  );

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold my-8 text-left">My Cart</h2>
      <hr className="w-full mb-4" />
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Your cart is empty
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
        <div className="flex flex-col gap-4">
          {cart.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col sm:flex-row relative"
            >
              <button
                onClick={() => {
                  removeFromCart(product.id);
                  showToast(`'${product.title} Removed from cart'`);
                }}
                className="absolute cursor-pointer top-2 left-2"
              >
                <span>
                  <FaTrash color="white" />
                </span>
              </button>
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : FALLBACK_IMAGE
                }
                alt={product.title}
                className="w-full sm:w-1/4  object-cover rounded-t-lg bg-gray-100"
              />
              <div className="p-4 flex flex-col flex-grow justify-between">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1 text-left">
                  {product.title}
                </h3>

                <p className="text-sm text-left">{product.description}</p>
                <hr className="mt-2 py-2" />
                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-2 border rounded-md p-2">
                    <button
                      onClick={() =>
                        product.quantity > 1 &&
                        updateQuantity(product.id, product.quantity - 1)
                      }
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(product.id, product.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="text-blue-600 font-bold mt-2">
                    ${product.price * product.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <hr />
          <div className="w-full flex flex-col items-start gap-2 p-4 bg-gray-200 shadow-md rounded-lg overflow-hidden">
            <h4 className="text-lg font-bold text-gray-800">Order summary</h4>
            <p className="text-sm text-gray-800">Items({cart.length})</p>
            <div className="w-full flex flex-col items-start gap-2">
              <div className="flex justify-between w-full items-center">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Shipping Address
                </h4>

                {shippingAddress && !isEditingAddress && (
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Change
                  </button>
                )}
              </div>

              {!shippingAddress || isEditingAddress ? (
                <div className="w-full flex flex-col gap-2">
                  <select
                    value={selectedAddressId}
                    onChange={(e) => {
                      setSelectedAddressId(e.target.value);
                      setIsEditingAddress(false);
                    }}
                    className="w-full text-sm text-blue-500 border rounded-sm bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Select an address
                    </option>
                    {user?.billingAddress?.map((addr) => (
                      <option key={addr.id} value={addr.id}>
                        {addr.type}: {addr.address}
                      </option>
                    ))}
                  </select>
                  {isEditingAddress && (
                    <button
                      onClick={() => setIsEditingAddress(false)}
                      className="text-[10px] text-gray-400 text-right hover:text-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-sm animate-in fade-in duration-300">
                  <p className="font-semibold text-gray-800 text-left">
                    {shippingAddress.address}
                    <span className="text-[10px] bg-gray-200 px-1 rounded uppercase">
                      ({shippingAddress.type})
                    </span>
                  </p>
                  <p className="text-gray-600 text-xs">
                    {shippingAddress.city}, {shippingAddress.state}{' '}
                    {shippingAddress.zip}
                  </p>
                </div>
              )}

              {user?.billingAddress?.length === 0 && (
                <p className="text-xs text-red-500 italic">
                  *Add your shipping address to your billing profile to
                  continue*
                </p>
              )}
            </div>
            <hr className="w-full my-2 border-gray-400" />
            <div className="w-full space-y-2 ">
              <div className="flex justify-between text-sm text-gray-800 font-sans">
                <p>Subtotal</p>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-800 font-sans">
                <p>Shipping Cost</p>
                <span className="font-bold">${shippingCost.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 font-sans border-t border-gray-400 mt-2">
                <p>Total</p>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() =>
                navigate('/checkout', {
                  state: {
                    amount: total,
                    shipping: shippingCost.toFixed(2),
                    isBuyNow: false,
                    products: cart,
                  },
                })
              }
              className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex-1"
            >
              Go to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
