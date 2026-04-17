import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CheckoutPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const subtotal = location.state?.amount || 0;

  const tax = subtotal * 0.21;
  const finalTotal = subtotal + tax;

  if (subtotal === 0) {
    return <div className="p-8 text-center">Checkout is empty</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Finalize Payment</h1>

      <div className="bg-white shadow-md rounded-lg p-6 border">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Order Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500 italic">
            <span>Taxes & Processing (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <hr />

          <div className="flex justify-between items-center pt-2">
            <span className="text-xl font-bold">Total to Pay:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <button className="w-full mt-8 bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
