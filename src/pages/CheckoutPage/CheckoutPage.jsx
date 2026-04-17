import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import PaymentModal from '../../components/PaymentModal/PaymentModal.jsx';

import {
  FaCcMastercard,
  FaCcVisa,
  FaCcAmex,
  FaCcDiscover,
} from 'react-icons/fa6';

const CheckoutPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const products = cart || [];
  const cartShippingCosts = location.state?.shipping || 0;
  const shippingCost = location.state?.shippingCost || 0;
  const subtotal = location.state?.amount || 0;

  const tax = subtotal * 0.21;
  const finalTotal = subtotal + tax;

  if (subtotal === 0) {
    return <div className="p-8 text-center">Checkout is empty</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold py-4 text-left">Checkout</h1>
      <hr />
      <div className="bg-white shadow-md mt-4 rounded-lg p-6 border">
        <h2 className="text-lg text-left font-semibold mb-4 border-b pb-2">
          Order Summary
        </h2>
        {!purchaseCompleted &&
        (products.length > 0 || location.state?.isBuyNow) ? (
          <div className="space-y-3">
            {!location.state?.isBuyNow && (
              <div className="text-sm">
                {products.map((product) => (
                  <div key={product.id} className="flex justify-between mb-2">
                    <span>{product.title}</span>
                    <span>({product.quantity})</span>
                    <span className="flex-grow text-right  text-blue-400">
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Cost:</span>
                  <span className="text-blue-400">${cartShippingCosts}</span>
                </div>
              </div>
            )}

            <hr />

            <div className="text-sm">
              {location.state?.isBuyNow && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Cost:</span>
                  <span className="text-blue-400">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-blue-400">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-500 italic">
                <span>Taxes & Processing (10%):</span>
                <span className="text-blue-400">${tax.toFixed(2)}</span>
              </div>
            </div>

            <hr />

            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-bold">Total to Pay:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <hr />
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-gray-500 font-medium">Checkout is empty</p>
          </div>
        )}

        <p className="mt-4 text-xs text-left">
          We accept the following payment methods:
        </p>

        <div className="flex text-gray-800 text-[2rem] gap-4 mt-4">
          <FaCcAmex />
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcDiscover />
        </div>

        <button
          className="w-full mt-8 bg-green-600 text-white py-2 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg sm:w-1/4 flex"
          onClick={() => setShowModal(true)}
        >
          <span className="flex-grow">Pay Now</span>
        </button>
      </div>
      <PaymentModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setPurchaseCompleted(true);
        }}
        user={user}
        finalTotal={finalTotal}
        products={products}
      />
    </div>
  );
};

export default CheckoutPage;
