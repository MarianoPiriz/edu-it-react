import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function PaymentModal({
  isOpen,
  onClose,
  user,
  finalTotal,
  products,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [paid, setPaid] = useState(false);
  const { addPurchase } = useAuth();
  const { clearCart } = useCart();

  const paymentMethods = user.paymentMethod;

  function handlePay() {
    const method = paymentMethods.find((m) => m.id === selectedId);

    const purchase = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      paymentMethod: {
        type: method.type,
        lastFour: method.lastFour,
      },
      products: products,
      total: finalTotal,
    };
    const result = addPurchase(purchase);

    if (result.success) {
      clearCart();
      setPaid(true);
      setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
          setIsClosing(false); // Reseteamos para la próxima vez
        }, 500);
      }, 1500);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-500
  ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div
        className={`bg-white rounded-xl w-full max-w-md p-6 flex flex-col overflow-y-auto max-h-[80vh] no-scrollbar shadow-2xl transition-transform duration-500 ease-in-out
    ${isClosing ? 'translate-y-[100vh]' : 'translate-y-0'}`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-medium text-lg">Confirm payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Métodos de pago */}
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
          Select a payment method
        </p>
        <div className="flex flex-col gap-2 mb-5">
          {paymentMethods.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
                ${selectedId === m.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <span className="text-sm font-medium text-gray-500">
                {m.type}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">•••• {m.lastFour}</p>
                <p className="text-xs text-gray-400">
                  {m.firstName} {m.lastName}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="border-t pt-4 mb-5">
          {products?.map((p) => (
            <div
              key={p.id}
              className="flex justify-between text-sm text-gray-500 py-1"
            >
              <span>
                {p.title} (x{p.quantity})
              </span>
              <span>${(p.price * p.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-medium mt-2 pt-2 border-t">
            <span>Total</span>
            <span>${finalTotal?.toFixed(2)}</span>
          </div>
        </div>

        {paid ? (
          <p className="text-center text-green-600 font-medium py-2">
            Payment confirmed ✓
          </p>
        ) : (
          <button
            onClick={handlePay}
            disabled={!selectedId}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirm payment
          </button>
        )}
      </div>
    </div>
  );
}
